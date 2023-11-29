const express = require('express');
const router = express.Router();
const teacherAuthController = require('../controllers/teacherAuth');
const studentAuthController = require('../controllers/studentAuth');
const homeController = require('../controllers/home');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', homeController.getIndex);

//Teacher Auth
router.get('/teacher/login', teacherAuthController.getLogin);
router.post('/teacher/login', teacherAuthController.postLogin);
router.get('/teacher/signup', teacherAuthController.getSignup);
router.post('/teacher/signup', teacherAuthController.postSignup);
router.get('/teacher/logout', teacherAuthController.logout);


//Student Auth
router.get('/student/login', studentAuthController.getLogin);
router.post('/student/login', studentAuthController.postLogin);
router.get('/student/signup', studentAuthController.getSignup);
router.post('/student/signup', studentAuthController.postSignup);
router.get('/student/logout', studentAuthController.logout);

module.exports = router