const express = require('express');
// const multer = require('multer');

// const authJwt = require('./utils/verifyJwtToken');
// const verifySignUp = require('./utils/verifySignUp');
const userController = require('./controller/user.controller');

// const upload = multer(); // for parsing multipart/form-data
const router = express.Router();

const api = require('./constants/api');

// router.route(`${api.GLSL_PROGRAMS_URL_PART}/:id`)
//   .get(GlslPrograms.getFullOrPartOfGLSLProgramById)
//   .put(GlslPrograms.updateGLSLProgramById)
//   .delete(GlslPrograms.removeGLSLProgramById);

// router.post('/register',

// router.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);

// router.post('/api/auth/signin', controller.signin);

// router.get('/api/test/user', [authJwt.verifyToken], controller.userContent);

// router.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);

// router.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

router.get(api.TEST_DATA, userController.getAllUsers);
router.get(api.CURRENT_USER, userController.getCurrentUser);

module.exports = router;
