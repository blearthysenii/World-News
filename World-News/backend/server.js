//server.js
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const commentRoutes = require('./routes/commentRoutes');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware që lexon token nga cookie dhe vendos req.user & res.locals.user nëse token është valid
const attachUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    res.locals.user = decoded;
  } catch (err) {
    // Nëse token nuk është valid, vazhdo pa bllokim
  }
  next();
};

app.use(attachUser);

// Set EJS and Layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes pa autentifikim
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

// Routes me autentifikim (komentet)
app.use('/api/comments', authMiddleware, commentRoutes);

const News = require('./models/News');
const Comment = require('./models/Comment');

// ROOT path => redirect to /news
app.get('/', (req, res) => {
  res.redirect('/news');
});

// Register page
app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// Login page
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Home page with news list
app.get('/news', async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }).lean();
    res.render('index', { title: 'Home', news });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Create news
app.post('/news/create', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).send('Title and content are required');
    }

    const newNews = new News({
      title,
      content,
      createdAt: new Date(),
    });

    await newNews.save();
    res.redirect('/news');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Show single news article with comments
app.get('/news/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id).lean();
    if (!news) return res.status(404).send('News not found');

    const comments = await Comment.find({ newsId: news._id })
      .populate('authorId', 'username')
      .sort({ createdAt: -1 })
      .lean();

    res.render('news', { title: news.title, news, comments, user: res.locals.user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
