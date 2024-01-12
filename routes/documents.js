const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const documentsController = require('../controllers/documents');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, documentsController.getDocuments);

router.post('/createDocument', upload.single("file"), documentsController.createDocument);

router.put('/markComplete', documentsController.markComplete);

router.put('/markIncomplete', documentsController.markIncomplete);

router.delete('/deleteDocument', documentsController.deleteDocument);

router.get('/getTeachersByTeacherId', documentsController.getTeachersByTeacherId);

router.put('/assignDocument/:documentId/:userId', documentsController.assignDocument);

module.exports = router;