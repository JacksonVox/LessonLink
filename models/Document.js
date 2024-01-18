const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  file: {
    type: String,
    required: true,
  },
  cloudinaryId: {
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
