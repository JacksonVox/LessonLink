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
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  completedByTeacherId: {
    type: String,
    required: false,
  },
  assignedToId: {
    type: String,
    required: false,
  },
  assignedToName: {
    type: String,
    required: false,
  }
})

module.exports = mongoose.model('Document', DocumentSchema)
