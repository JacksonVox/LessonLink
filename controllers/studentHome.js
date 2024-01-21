const { v4: uuidv4 } = require("uuid");
const { Teacher } = require("../models/Users");
const { Student } = require("../models/Users");
const Document = require("../models/Document");

module.exports = {
  getIndex: async (req, res) => {
    try {
      const student = await Student.findById(req.params.studentId);
      const documents = await Document.find({ teacherId: req.user.teacherId });
      req.logIn(student, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", { msg: "Success! You are logged in." });
        res.render("studentHome.ejs", {
          student: student,
          user: req.user,
          documents: documents,
        });
      });

    } catch (err) {
      console.log(err);
    }
  },
  putMarkComplete: async (req, res) => {
    try {
      const student = await Student.findById(req.body.studentId);
      const document = req.body.assignmentId;
      student.assignmentsCompleted.push(document);
      student.save();
      res.status(200).send({ message: 'Document marked complete successfully' });
    } catch (err) {
      console.log(err);
    }
  },
  putMarkIncomplete: async (req, res) => {
    try {
      const student = await Student.findById(req.body.studentId);
      const document = req.body.assignmentId;
      student.assignmentsCompleted.splice(student.assignmentsCompleted.indexOf(document), 1);
      student.save();
      res.status(200).send({ message: 'Document marked incomplete successfully' });
    } catch (err) {
      console.log(err);
    }
  },
};
