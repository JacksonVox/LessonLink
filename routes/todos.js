const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos)

router.post('/createDocument', todosController.createDocument)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteDocument', todosController.deleteDocument)

router.get('/getTeachersByTeacherId', todosController.getTeachersByTeacherId)

router.put('/assignDocument/:documentId/:userId', todosController.assignDocument)

module.exports = router