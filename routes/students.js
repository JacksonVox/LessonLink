const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const studentsController = require("../controllers/students");
const documentsController = require("../controllers/documents");
const authController = require("../controllers/auth");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, studentsController.getStudents);

router.get("/addStudent/:teacherId/:passKey", authController.getAddStudent);
router.post("/addStudent/:teacherId/:passKey", authController.postAddStudent);

router.get("/viewStudent/:studentId", ensureAuth, studentsController.getViewStudent);

module.exports = router;
