// server.js
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');


require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for frontend running on localhost:3000 (React dev server)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

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
    // Token jo valid, vazhdo pa bllokim
  }
  next();
};


app.use(attachUser);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/comments', authMiddleware, commentRoutes);

// Shërbej statik front-end build (pas që bën build React me `npm run build`)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Për çdo route tjetër, kthe React frontend (index.html)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
