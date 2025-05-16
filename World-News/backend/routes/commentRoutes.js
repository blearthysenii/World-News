const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Shto koment
router.post('/add', async (req, res) => {
  const { content, newsId } = req.body;

  // Kontrollo nëse ka content, newsId dhe user i loguar (req.user duhet të vijë nga middleware)
  if (!content || !newsId || !req.user) {
    return res.status(400).send('All fields required or user not logged in');
  }

  try {
    const newComment = new Comment({
      content,
      newsId,
      authorId: req.user.id, // Merr id-në nga token JWT e verifikuar
    });

    await newComment.save();
    res.redirect(`/news/${newsId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add comment');
  }
});

module.exports = router;
