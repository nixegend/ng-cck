const { Pool } = require('pg');
const serverConfig = require('../config');
const pool = new Pool(serverConfig.db);


// exports.signIn = async (req, res) => {
//   const respRes = await pool.query('SELECT $1::text as name', ['brianc'], (err, result) => {
//     if (err) {
//       console.error('Error executing query', err.stack);
//       return res.status(500).json(err.stack);
//     }

//     console.log(result.rows[0].name) // brianc
//   })


//   pool.connect((err, client, release) => {
//     if (err) {
//       console.error('Error acquiring client', err.stack);
//       return res.status(500).json(err.stack);
//     }

//     client.query('SELECT name, surename, role, email FROM users WHERE email = $1', ['tony_stark@mail.com'], (err, result) => {
//       release();

//       if (err) {
//         console.error('Error executing query', err.stack);
//         return res.status(500).json(err.stack);
//       }

//       return res.status(200).json(result.rows[0]);
//     });
//   });



//   User.findOne({
//     where: {
//       username: req.body.username
//     }
//   }).then(user => {
//     if (!user) {
//       return res.status(404).json({ reason: 'User Not Found.' });
//     }

//     var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//     if (!passwordIsValid) {
//       return res.status(401).json({ auth: false, accessToken: null, reason: 'Invalid Password!' });
//     }

//     var token = jwt.sign({ id: user.id }, config.secret, {
//       expiresIn: 86400 // expires in 24 hours
//     });

//     var authorities = [];
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         authorities.push('ROLE_' + roles[i].name.toUpperCase());
//       }
//       res.status(200).json({
//         auth: true,
//         accessToken: token,
//         username: user.username,
//         authorities: authorities
//       });
//     })
//   }).catch(err => {
//     res.status(500).json({ reason: err.message });
//   });
// }

exports.getCurrentUser = (req, res, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error acquiring client', err.stack);
      return res.status(500).json(err.stack);
    }

    client.query('SELECT name, surename, role, email FROM users WHERE email = $1', ['tony_stark@mail.com'], (err, result) => {
      release();

      if (err) {
        console.error('Error executing query', err.stack);
        return res.status(500).json(err.stack);
      }

      return res.status(200).json(result.rows[0]);
    });
  });
};

exports.getAllUsers = (req, res, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error acquiring client', err.stack);
      return res.status(500).json(err.stack);
    }

    client.query('SELECT name, surename, role, email FROM users', (err, result) => {
      release();

      if (err) {
        console.error('Error executing query', err.stack);
        return res.status(500).json(err.stack);
      }

      return res.status(200).json(result.rows);
    });
  });
};
