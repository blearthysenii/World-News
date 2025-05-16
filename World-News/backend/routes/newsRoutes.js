const express = require('express');
const News = require('../models/News');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// UPDATE news
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    console.log("User from token:", req.user); // DEBUG
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });

    // Kontrollo nëse ka authorId në dokumentin e news
    if (!news.authorId) {
      return res.status(400).json({ message: 'News is missing authorId' });
    }

    if (news.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, description, category } = req.body;
    news.title = title || news.title;
    news.description = description || news.description;
    news.category = category || news.category;
    news.updatedAt = new Date();

    await news.save();
    res.json(news);
  } catch (err) {
    console.error("Error in PUT /news/:id:", err); // DEBUG
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE news
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });

    if (!news.authorId) {
      return res.status(400).json({ message: 'News is missing authorId' });
    }

    if (news.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await news.remove();
    res.json({ message: 'News deleted successfully' });
  } catch (err) {
    console.error("Error in DELETE /news/:id:", err); // DEBUG
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
