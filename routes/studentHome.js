const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const studentsController = require("../controllers/students");
const studentHomeController = require("../controllers/studentHome");
const documentsController = require("../controllers/documents");
const authController = require("../controllers/auth");
const { ensureAuth } = require("../middleware/auth");

router.get("/:studentId", ensureAuth, studentHomeController.getIndex);

router.put("/markComplete", studentsController.putMarkComplete);
router.put("/markIncomplete", studentsController.putMarkIncomplete);

module.exports = router;
