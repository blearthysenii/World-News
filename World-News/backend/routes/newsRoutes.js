const express = require('express');
const News = require('../models/News');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all news
router.get('/', async (req, res) => {
  try {
    const news = await News.find().populate('authorId', 'username').sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create news (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const news = new News({
      authorId: req.user.id,
      title,
      content,
      category,
    });
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
