const jwt = require('jsonwebtoken');
const serverConfig = require('../config');
const { roles } = require('../models/user');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, serverConfig.jwtSecret, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Fail to Authentication. Error -> ' + err });
    }

    next();
  });
};

exports.isOwner = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, serverConfig.jwtSecret, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Fail to Authentication. Error -> ' + err });
    }

    if (decoded.role !== roles.OWNER) {
      res.status(401).json({ message: 'Invalid role for this user.' });
    }

    next();
  });
};
