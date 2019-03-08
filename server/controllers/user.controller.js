const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const serverConfig = require('../config');
const pool = new Pool(serverConfig.db);

exports.signIn = (req, res) => {
  pool.query('SELECT * FROM users WHERE email = $1', [req.body.email], (errPool, result) => {
    if (errPool) {
      console.error('Error executing query', errPool.stack);
      res.status(500).send(errPool.stack);
    }

    const user = result.rows[0];

    if (!user) {
      res.status(404).json({ message: 'User Not Found.' });
    }

    const isValidPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid Password.' });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, serverConfig.jwtSecret, {
      expiresIn: serverConfig.tokenExpireTime
    });

    res.status(200).json({
      token: token,
      email: user.email,
      role: user.role,
      name: user.name,
      surname: user.surname
    });
  });
};

exports.signUp = async (req, res) => {
  if (req.body.name && req.body.surname && req.body.email && req.body.password) {
    const userData = [req.body.role, req.body.name, req.body.surname, req.body.email, bcrypt.hashSync(req.body.password, 8)];

    const client = await pool.connect();
    const user = await client.query('SELECT email FROM users WHERE email = $1', [req.body.email]);

    if (Array.isArray(user.rows) && user.rows.length) {
      console.log(user.rows);
      res.status(409).json({ message: 'This user is already registered!' });
    } else {
      client.query('INSERT INTO users (role, name, surname, email, password) VALUES ($1, $2, $3, $4, $5)', userData);
      res.status(200).json({ message: `User '${req.body.email}' has been registered successfully!` });
    }

    client.release();
  } else {
    res.status(500).json({ message: 'Error executing query' });
  }
};

exports.getCurrentUser = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  const client = await pool.connect();

  jwt.verify(token, serverConfig.jwtSecret, async (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Fail to Authentication. Error -> ' + err });
    } else {
      const currentUser = await client.query('SELECT name, surname, role, email FROM users WHERE email = $1', [decoded.email]);
      res.status(200).json(currentUser.rows[0]);
    }

    client.release();

    next();
  });
};

//   pool.connect((errPool, client, release) => {
//     if (errPool) {
//       console.error('Error acquiring client', errPool.stack);
//       res.status(500).send(errPool.stack);
//     }

//     client.query('SELECT name, surname, role, email FROM users WHERE email = $1', [req.body.email], (errClient, result) => {
//       release();

//       if (errClient) {
//         console.error('Error executing query', errClient.stack);
//         res.status(500).send(errClient.stack);
//       }

//       res.status(200).json(result.rows[0]);
//     });
//   });

exports.getAllUsers = (req, res, next) => {
  pool.query('SELECT name, surname, role, email FROM users')
    .then(result => res.status(200).json(result.rows))
    .catch(err => res.status(500).send(err.stack));
};
