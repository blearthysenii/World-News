const express = require('express');
const News = require('../models/News');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// CREATE news
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: 'Please provide title, content, and category' });
    }

    const news = new News({
      authorId: req.user.id, // nga tokeni
      title,
      content,
      category,
    });

    await news.save();
    res.status(201).json(news);
  } catch (err) {
    console.error("Error in POST /news:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE news
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });

    if (!news.authorId) {
      return res.status(400).json({ message: 'News is missing authorId' });
    }
    if (news.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, content, category } = req.body;
    news.title = title || news.title;
    news.content = content || news.content;
    news.category = category || news.category;
    news.updatedAt = new Date();

    await news.save();
    res.json(news);
  } catch (err) {
    console.error("Error in PUT /news/:id:", err);
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
    console.error("Error in DELETE /news/:id:", err);
    res.status(500).json({ message: 'Server error' });
  }
});
// GET all news
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET one news by ID
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
