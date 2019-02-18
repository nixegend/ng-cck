const jwt = require('jsonwebtoken');
const serverConfig = require('../config');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, serverConfig.jwtSecret, (err, decoded) => {
    if (err) {
      res.status(500).json({ message: 'Fail to Authentication. Error -> ' + err });
    }

    next();
  });
};

exports.isAdmin = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, serverConfig.jwtSecret, (err, decoded) => {
    if (err) {
      res.status(500).json({ message: 'Fail to Authentication. Error -> ' + err });
    }

    console.log('============================================');
    console.log(decoded);
    console.log('============================================');

    next();
  });
};
