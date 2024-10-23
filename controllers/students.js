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
      //temporary log
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
  putEditStudent: async (req, res) => {
    try {
      const student = await Student.findById(req.body.studentId);
      if (student.userName === req.body.studentName && student.note === req.body.studentNote){
        res.redirect("/students/viewStudent/" + student._id)
      } else if (req.body.studentName !== null){
      student.userName = req.body.studentName;
      student.note = req.body.studentNote;
      student.save();
      res.redirect("/students/viewStudent/" + student._id)
      }} catch (err) {
      console.log(err);
    }
  },
  putAssignDocument: async (req, res) => {
    try {
      const student = await Student.findById(req.body.studentId);
      const document = req.body.document;
      if (student.assignments.includes(document)){
        res.redirect("/students/viewStudent/" + student._id)
      } else if (document !== null){
      student.assignments.push(document);
      student.save();
      res.redirect("/students/viewStudent/" + student._id)
      }} catch (err) {
      console.log(err);
    }
  },
  putUnassignDocument: async (req, res) => {
    try {
      const student = await Student.findById(req.body.studentId);
      const document = req.body.assignmentId;
      const index = student.assignments.indexOf(document);
    
    //check if document exists in array
    if (index !== -1) {
      student.assignments.splice(index, 1);
      await student.save();
    }
    res.status(200).send({ message: 'Document unassigned successfully' });
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
