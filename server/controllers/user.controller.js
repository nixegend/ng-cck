const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { roles } = require('../models/user');
const serverConfig = require('../config');
const pool = new Pool(serverConfig.db);

exports.signIn = (req, res) => {
  pool.query('SELECT name, surname, role, email FROM users WHERE email = $1 AND name = $2', [req.body.email, req.body.name], (err, result) => {
    if (err) {
      console.error('Error executing query', err.stack);
      res.status(500).send(err.stack);
    }

    const user = result.rows[0];

    if (!user) {
      res.status(404).json({ accessToken: null, reason: 'User Not Found.' });
    }

    const isValidPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!isValidPassword) {
      res.status(401).json({ accessToken: null, reason: 'Invalid Password!' });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, serverConfig.jwtSecret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).json({
      token: token,
      name: user.name,
      surname: user.surname,
      role: user.role,
      email: user.email
    });
  });
};

exports.signUp = async (req, res) => {
  if (req.body.name && req.body.surname && req.body.email && req.body.password) {
    const userData = [roles.USER, req.body.name, req.body.surname, req.body.email, bcrypt.hashSync(req.body.password, 8)];

    const client = await pool.connect();
    const user = await client.query('SELECT email FROM users WHERE email = $1', [req.body.email]);

    if (Array.isArray(user.rows) && user.rows.length) {
      console.log(user.rows);
      res.status(500).json({ message: 'This user is already registered!' });
    } else {
      client.query('INSERT INTO users (role, name, surname, email, password) VALUES ($1, $2, $3, $4, $5)', userData);
      res.status(200).json({ message: `User "${req.body.email}" has been registered successfully!` });
    }

    client.release();
  } else {
    // console.error('Error executing query');
    res.status(500).json({ message: 'Error executing query' });
  }
};

exports.getCurrentUser = (req, res, next) => {
  pool.connect((errPool, client, release) => {
    if (errPool) {
      console.error('Error acquiring client', errPool.stack);
      res.status(500).send(errPool.stack);
    }

    client.query('SELECT name, surname, role, email FROM users WHERE email = $1', ['tony_stark@mail.com'], (errClient, result) => {
      release();

      if (errClient) {
        console.error('Error executing query', errClient.stack);
        res.status(500).send(errClient.stack);
      }

      res.status(200).send(result.rows[0]);
    });
  });
};

exports.getTestData = (req, res, next) => {
  pool.query('SELECT name, surname, role, email FROM users')
    .then(result => res.status(200).send(result.rows))
    .catch(err => res.status(500).send(err.stack));
};

// exports.getTestData = (req, res, next) => {
  // pool.connect((err, client, release) => {
  //   if (err) {
  //     console.error('Error acquiring client', err.stack);
  //     res.status(500).send(err.stack);
  //   }

  //   client.query('SELECT name, surname, role, email FROM users', (err, result) => {
  //     release();

  //     if (err) {
  //       console.error('Error executing query', err.stack);
  //       res.status(500).send(err.stack);
  //     }

  //     res.status(200).send(result.rows);
  //   });
  // });
// };
