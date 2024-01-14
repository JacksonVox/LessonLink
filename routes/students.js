const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const studentsController = require('../controllers/students');
const documentsController = require('../controllers/documents');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, studentsController.getStudents);


module.exports = router;