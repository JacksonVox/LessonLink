const Document = require("../models/Document");
const cloudinary = require("../middleware/cloudinary");
const { v4: uuidv4 } = require("uuid");
const { Teacher } = require("../models/Users");
const { Student } = require("../models/Users");

module.exports = {
  getDocuments: async (req, res) => {
    console.log(req.user);
    try {
      let documentItems = await Document.find({
        teacherId: req.user.teacherId,
      });
      documentItems = documentItems.sort((a, b) => b.dateCreated - a.dateCreated);
      const teamTeachers = await Student.find({
        teacherId: req.user.teacherId,
      });
      const adminTeacher = await Teacher.findById(req.user.teacherId);
      res.render("documents.ejs", {
        documents: documentItems,
        user: req.user,
        teacherId: req.user.teacherId,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createDocument: async (req, res) => {
    try {
      //Upload document to cloudinary
      const result = await cloudinary.uploader.upload(
        req.file.path,
        { resource_type: "auto", type: "upload" },
        async function (error, result) {
          if (error) {
            console.log(result, error);
          } else {
            await Document.create({
              title: req.body.title,
              description: req.body.description,
              file: result.secure_url,
              cloudinaryId: result.public_id,
              teacherId: req.user.teacherId,
              completedByUserId: req.user.id,
            });
          }
        }
      );
      console.log("Document has been added!");
      res.redirect("/documents");
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Document.findOneAndUpdate(
        { _id: req.body.documentIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log("Marked Complete");
      res.json("Marked Complete");
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Document.findOneAndUpdate(
        { _id: req.body.documentIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
    }
  },
  deleteDocument: async (req, res) => {
    try {
      const { docId, docCloudId } = req.body;

      if (!docId || !docCloudId) {
        return res.status(400).json({ message: "Document ID is required" });
      }
      await cloudinary.uploader.destroy(docCloudId);
      await Document.findByIdAndDelete(docId);
      res.status(200).json({ message: "Document deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete document" });
    }
  },
  getTeachersByTeacherId: async (req, res) => {
    try {
      const userTeam = await Student.find({ teacherId: req.user.teacherId });
      res.json(userTeam);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
  assignDocument: async (req, res) => {
    try {
      await Document.findByIdAndUpdate(req.params.documentId, {
        assignedToId: req.params.userId,
      });
      res.json({ status: "OK" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
};
