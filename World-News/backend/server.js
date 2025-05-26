// server.js
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors({
  origin: 'http://localhost:4001',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/comments', authMiddleware, commentRoutes);

// Serve React build
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});
const attachUser = (req, res, next) => {
  let token;

  // First try from Authorization header
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // If not in header, try cookies
  if (!token && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(); // No token = unauthenticated
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    res.locals.user = decoded;
  } catch (err) {
    console.error("Invalid token:", err.message);
  }

  next();
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
