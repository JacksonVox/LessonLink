const express = require('express')
const router = express.Router()
const studentsController = require('../controllers/students') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, studentsController.getStudents)

router.delete('/archiveStudent', studentsController.archiveStudent)

router.put('/assignDocument/:studentId/:userId', documentsController.assignDocument)

module.exports = router