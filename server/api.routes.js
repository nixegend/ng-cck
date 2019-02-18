const express = require('express');
// const authJwt = require('./utils/verifyJwtToken');
// const verifySignUp = require('./utils/verifySignUp');
const userController = require('./controllers/user.controller');

const router = express.Router();

const api = require('./constants/api');

// router.route(path)
//   .get()
//   .put()
//   .delete();

// router.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);

// router.get('/api/test/user', [authJwt.verifyToken], controller.userContent);

// router.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);

// router.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

router.post(api.SIGNUP_USER, userController.signUp);
router.post(api.SIGNIN_USER, userController.signIn);

router.get(api.CURRENT_USER, userController.getCurrentUser);

router.get(api.ALL_USERS, userController.getAllUsers);

module.exports = router;
