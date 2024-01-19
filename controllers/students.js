const { v4: uuidv4 } = require("uuid");
const { Teacher } = require("../models/Users");
const { Student } = require("../models/Users");
const Document = require("../models/Document");

module.exports = {
  getStudents: async (req, res) => {
    console.log(req.user);
    const passKey = uuidv4();
    try {
      let students = await Student.find({ teacherId: req.user.teacherId }).sort({ userName: 1 });
      let documents = await Document.find({ teacherId: req.user.teacherId });
      // check student data
      console.log(students);
      const adminTeacher = await Teacher.findById(req.user.teacherId);
      res.render("students.ejs", {
        students: students,
        user: req.user,
        teacherId: req.user.teacherId,
        passKey: passKey,
        documents: documents,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getViewStudent: async (req, res) => {
    try {
      let student = await Student.findOne({ _id: req.params.studentId });
      let documents = await Document.find({ teacherId: req.user.teacherId });
      // check student data
      console.log(student);
      res.render("viewStudent.ejs", {
        student: student,
        user: req.user,
        documents: documents,
      });
    } catch (err) {
      console.log(err);
    }
  },
  putAssignDocument: async (req, res) => {
    try {
      const student = await Student.findById(req.body.studentId);
      const document = req.body.document;
      student.assignments.push(document);
      student.save();
      res.redirect("/students/viewStudent/" + student._id)
      } catch (err) {
      console.log(err);
    }
  },
  putMarkComplete: async (req, res) => {
    try {
      const student = await Student.findById(req.params.studentId);
      const document = req.params.documentId;
      student.assignmentsCompleted.push(document);
      student.save();
      res.json(student);
    } catch (err) {
      console.log(err);
    }
  },
  putMarkIncomplete: async (req, res) => {
    try {
      const student = await Student.findById(req.params.studentId);
      const document = req.params.documentId;
      student.assignmentsCompleted.splice(assignmentsCompleted.indexOf(document), 1);
      student.save();
      res.json(student);
    } catch (err) {
      console.log(err);
    }
  },
};
