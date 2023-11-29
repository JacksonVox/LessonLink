const express = require('express')
const router = express.Router()
const documentsController = require('../controllers/documents') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, documentsController.getDocuments)

router.post('/createDocument', documentsController.createDocument)

router.put('/markComplete', documentsController.markComplete)

router.put('/markIncomplete', documentsController.markIncomplete)

router.delete('/deleteDocument', documentsController.deleteDocument)

router.get('/getUsersByAdminId', documentsController.getUsersByAdminId)

router.put('/assignDocument/:documentId/:userId', documentsController.assignDocument)

module.exports = router