const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authenticateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Access denied. No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: 'Access denied. Invalid token' });
    }

    req.user = user;
    next();
  });
});

const verifyApiKey = asyncHandler(async (req, res, next) => {
  const { apiKey } = req.query;

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Invalid API key',
    });
  }

  next();
});

module.exports = {
  authenticateToken,
  verifyApiKey,
};
