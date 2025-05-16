//authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;  // lexon token nga cookie
  if (!token) {
    req.user = null;  // lejoje të vazhdojë, por nuk ka user
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ruan info të user-it në request
    next();
  } catch (err) {
    req.user = null; // token i pavlefshëm
    next();
  }
};

module.exports = authMiddleware;
