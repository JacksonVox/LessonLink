const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema({
  docTitle: {
    type: String,
    required: true,
  },
  docDescription: {
    type: String,
    required: false,
  },
  docFile: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedByTeacherId: {
    type: String,
    required: false,
  },
  assignedToId: {
    type: String,
    required: false,
  },
})

module.exports = mongoose.model('Document', DocumentSchema)
