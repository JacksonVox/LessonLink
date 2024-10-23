const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const documentsController = require('../controllers/documents');
const { ensureAuth, ensureTeacher } = require('../middleware/auth');

router.get('/', ensureAuth, ensureTeacher, documentsController.getDocuments);

router.post('/createDocument', ensureTeacher, upload.single("file"), documentsController.createDocument);

router.delete('/deleteDocument', ensureTeacher, documentsController.deleteDocument);


module.exports = router;