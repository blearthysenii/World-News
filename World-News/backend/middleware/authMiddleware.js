//authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization']; 
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};

module.exports = authMiddleware;
