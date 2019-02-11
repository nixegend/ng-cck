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
      return res.status(500).send(err.stack);
    }

    const user = result.rows[0];

    if (!user) {
      return res.status(404).send({ accessToken: null, reason: 'User Not Found.' });
    }

    const isValidPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({ accessToken: null, reason: 'Invalid Password!' });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, serverConfig.jwtSecret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({
      accessToken: token,
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
    client.release();

    if (user.result) {
      console.log(user.result);
    }

    if (user.err) {
      const registeredUserInfo = await client.query('INSERT INTO users (role, name, surname, email, password) VALUES ($1, $2, $3, $4, $5)', userData);
      client.release();

      if (registeredUserInfo.err) {
        console.error('Error executing query', err.stack);
        return res.status(500).send({ reason: err.stack });
      }

      return res.send({ message: 'Registered successfully!' });
    }
  } else {
    console.error('Error executing query', err.stack);
    return res.status(500).send({ reason: err.message });
  }
};

exports.getCurrentUser = (req, res, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error acquiring client', err.stack);
      return res.status(500).send(err.stack);
    }

    client.query('SELECT name, surname, role, email FROM users WHERE email = $1', ['tony_stark@mail.com'], (err, result) => {
      release();

      if (err) {
        console.error('Error executing query', err.stack);
        return res.status(500).send(err.stack);
      }

      return res.status(200).send(result.rows[0]);
    });
  });
};

exports.getAllUsers = (req, res, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error acquiring client', err.stack);
      return res.status(500).send(err.stack);
    }

    client.query('SELECT name, surname, role, email FROM users', (err, result) => {
      release();

      if (err) {
        console.error('Error executing query', err.stack);
        return res.status(500).send(err.stack);
      }

      return res.status(200).send(result.rows);
    });
  });
};

exports.getTestData = (req, res) => {
  const list = [{ title: 'test', data: 123 }];
  return res.status(200).json(list);
}
