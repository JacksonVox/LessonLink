const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const studentsController = require("../controllers/students");
const documentsController = require("../controllers/documents");
const authController = require("../controllers/auth");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, studentsController.getStudents);

router.get("/viewStudent/:studentId", ensureAuth, studentsController.getViewStudent);

router.post("/assignDocument", studentsController.putAssignDocument);
router.put("/unassignDocument", studentsController.putUnassignDocument);

router.put("/markComplete", studentsController.putMarkComplete);
router.put("/markIncomplete", studentsController.putMarkIncomplete);

module.exports = router;
