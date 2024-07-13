const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized user. Please login with your account' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return next(err); // Propagate the error to the error-handling middleware
    }

    req.user = user;
    next();
  });
};

module.exports = verifyTokenMiddleware;
