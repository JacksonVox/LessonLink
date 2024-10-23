const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const studentsController = require("../controllers/students");
const documentsController = require("../controllers/documents");
const authController = require("../controllers/auth");
const { ensureAuth, ensureTeacher } = require("../middleware/auth");

router.get("/", ensureAuth, ensureTeacher, studentsController.getStudents);

router.get("/viewStudent/:studentId", ensureTeacher, studentsController.getViewStudent);
router.put("/editStudent", ensureTeacher, studentsController.putEditStudent);

router.post("/assignDocument", ensureTeacher, studentsController.putAssignDocument);
router.put("/unassignDocument", ensureTeacher, studentsController.putUnassignDocument);

router.put("/markComplete", ensureTeacher, studentsController.putMarkComplete);
router.put("/markIncomplete", ensureTeacher, studentsController.putMarkIncomplete);

module.exports = router;
