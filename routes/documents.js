const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const documentsController = require('../controllers/documents');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, documentsController.getDocuments);

router.post('/createDocument', upload.single("file"), documentsController.createDocument);

router.delete('/deleteDocument', documentsController.deleteDocument);

router.get('/getTeachersByTeacherId', documentsController.getTeachersByTeacherId);


module.exports = router;