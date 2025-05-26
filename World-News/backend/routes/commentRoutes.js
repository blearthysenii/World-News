const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/authMiddleware'); 


router.post('/add', authMiddleware, async (req, res) => {
  const { content, newsId } = req.body;

  if (!content || !newsId) {
    return res.status(400).json({ message: 'Content and newsId are required' });
  }

  try {
    const newComment = new Comment({
  content,
  newsId,
  user: req.user.id  
});



     await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.warn("Error saving comment:", error);
    res.status(500).json({ error: "Failed to save comment." });
  }
});

router.get('/:newsId', async (req, res) => {
  try {
    const comments = await Comment.find({ newsId: req.params.newsId }).populate('user', 'username'); 
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments." });
  }
});



module.exports = router;
