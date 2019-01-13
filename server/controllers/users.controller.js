const { Pool } = require('pg');
const serverConfig = require('../config');
const pool = new Pool(serverConfig.db);

exports.getAllUsers = (req, res, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error acquiring client', err.stack);
      return res.status(500).json(err.stack);
    }

    client.query('SELECT name, surename, role, email FROM "users"', (err, result) => {
      release();

      if (err) {
        console.error('Error executing query', err.stack);
        return res.status(500).json(err.stack);
      }

      return res.status(200).json(result.rows);
    });
  });
};
