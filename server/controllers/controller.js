// const db = require('../config/db.config.js');
// const config = require('../config/config.js');
// const User = db.user;
// const Role = db.role;

// const Op = db.Sequelize.Op;

// var jwt = require('jsonwebtoken');
// var bcrypt = require('bcryptjs');

// exports.register = (req, res) => {
//   const hashedPassword = bcrypt.hashSync(req.body.password, 8);

//   User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: hashedPassword
//   }, (err, user) => {
//       if (err) {
//         return res.status(500).send("There was a problem registering the user.");
//       }

//       // create a token
//       const token = jwt.sign({ id: user._id }, config.secret, {
//         expiresIn: 86400 // expires in 24 hours
//       });

//       res.status(200).send({ auth: true, token: token });
//     });
// };

// exports.signup = (req, res) => {
//   // Save User to Database
//   User.create({
//     name: req.body.name,
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8)
//   }).then(user => {
//     Role.findAll({
//       where: {
//         name: {
//           [Op.or]: req.body.roles
//         }
//       }
//     }).then(roles => {
//       user.setRoles(roles).then(() => {
//         res.send({ message: 'Registered successfully!' });
//       });
//     }).catch(err => {
//       res.status(500).send({ reason: err.message });
//     });
//   }).catch(err => {
//     res.status(500).send({ reason: err.message });
//   })
// }

// exports.signin = (req, res) => {
//   User.findOne({
//     where: {
//       username: req.body.username
//     }
//   }).then(user => {
//     if (!user) {
//       return res.status(404).send({ reason: 'User Not Found.' });
//     }

//     var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//     if (!passwordIsValid) {
//       return res.status(401).send({ auth: false, accessToken: null, reason: 'Invalid Password!' });
//     }

//     var token = jwt.sign({ id: user.id }, config.secret, {
//       expiresIn: 86400 // expires in 24 hours
//     });

//     var authorities = [];
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         authorities.push('ROLE_' + roles[i].name.toUpperCase());
//       }
//       res.status(200).send({
//         auth: true,
//         accessToken: token,
//         username: user.username,
//         authorities: authorities
//       });
//     })
//   }).catch(err => {
//     res.status(500).send({ reason: err.message });
//   });
// }

// exports.userContent = (req, res) => {
//   User.findOne({
//     where: { id: req.userId },
//     attributes: ['name', 'username', 'email'],
//     include: [{
//       model: Role,
//       attributes: ['id', 'name'],
//       through: {
//         attributes: ['userId', 'roleId'],
//       }
//     }]
//   }).then(user => {
//     res.status(200).send({
//       'description': '>>> User Contents!',
//       'user': user
//     });
//   }).catch(err => {
//     res.status(500).send({
//       'description': 'Can not access User Page',
//       'error': err
//     });
//   })
// }

// exports.adminBoard = (req, res) => {
//   User.findOne({
//     where: { id: req.userId },
//     attributes: ['name', 'username', 'email'],
//     include: [{
//       model: Role,
//       attributes: ['id', 'name'],
//       through: {
//         attributes: ['userId', 'roleId'],
//       }
//     }]
//   }).then(user => {
//     res.status(200).send({
//       'description': '>>> Admin Contents',
//       'user': user
//     });
//   }).catch(err => {
//     res.status(500).send({
//       'description': 'Can not access Admin Board',
//       'error': err
//     });
//   })
// }

// exports.managementBoard = (req, res) => {
//   User.findOne({
//     where: { id: req.userId },
//     attributes: ['name', 'username', 'email'],
//     include: [{
//       model: Role,
//       attributes: ['id', 'name'],
//       through: {
//         attributes: ['userId', 'roleId'],
//       }
//     }]
//   }).then(user => {
//     res.status(200).send({
//       'description': '>>> Project Management Board',
//       'user': user
//     });
//   }).catch(err => {
//     res.status(500).send({
//       'description': 'Can not access Management Board',
//       'error': err
//     });
//   })
// }

exports.getTestData = (req, res) => {
  const list = [{ title: 'test', data: 123 }];
  return res.status(200).json(list);
}

// const GlslPrograms = require('../models/glsl-programs');

// exports.getFullOrPartOfGLSLProgramById = async (req, res) => {
//   let result = null;

//   if (req.query.fieldName) {
//     result = await GlslPrograms.findById(req.params.id).select(req.query.fieldName).exec();
//   } else {
//     result = await GlslPrograms.findById(req.params.id).exec();
//   }

//   return res.status(200).json(result);
// }

// exports.getAllGLSLProgramsShortModels = async (req, res) => {
//   const result = await GlslPrograms.find().select('name previewBgUlr').exec();
//   return res.status(200).json(result);
// }

// exports.removeGLSLProgramById = (req, res, next) =>
//   GlslPrograms.remove({ _id: req.params.id }, (err) => {
//     if (err) {
//       return res.status(422).send({ error: 'Cannot remove glsl program by id' });
//     }

//     return res.status(200).send();
//   });

// exports.createGLSLProgram = async (req, res, next) => {
//   if (!req.body.name) {
//     return res.status(422).send({ error: 'GLSL program "name" is not specified' });
//   }

//   const newGlslProgram = await GlslPrograms.create(req.body);

//   return res.status(201).json(newGlslProgram);
// };

// exports.updateGLSLProgramById = (req, res, next) =>
//   GlslPrograms.findById(req.params.id, (err, objModel) => {
//     if (err) {
//       console.log(err);
//     }

//     objModel.set(req.body);
//     objModel.save((err, updatedModel) => {
//       if (err) {
//         console.log(err);
//       }

//       res.status(200).json(updatedModel);
//     });
//   });
