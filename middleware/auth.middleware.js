const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized!' });
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded;

    next();
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

module.exports = auth;
