const News = require('../models/News');

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().populate('authorId', 'username').sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('authorId', 'username');
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createNews = async (req, res) => {
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
};

exports.updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    if (news.authorId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    const { title, content, category } = req.body;
    news.title = title || news.title;
    news.content = content || news.content;
    news.category = category || news.category;
    news.updatedAt = Date.now();

    await news.save();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    if (news.authorId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    await news.remove();
    res.json({ message: 'News deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
