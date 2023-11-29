const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
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

module.exports = mongoose.model('Todo', TodoSchema)
