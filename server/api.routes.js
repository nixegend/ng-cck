const express = require('express');
const authJwt = require('./utils/jwt-auth');
const userController = require('./controllers/user.controller');

const router = express.Router();

const api = require('./constants/api');

// router.route(path)
//   .get()
//   .put()
//   .delete();

router.post(api.SIGNUP_USER, userController.signUp);
router.post(api.SIGNIN_USER, userController.signIn);

router.get(api.CURRENT_USER, [authJwt.verifyToken], userController.getCurrentUser);
router.get(api.ALL_USERS, [authJwt.isAdmin], userController.getAllUsers);

module.exports = router;
