const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const StudentSchema = new mongoose.Schema({
    userType: { type: String, default: 'student' },
    userName: { type: String, unique: false },
    email: { type: String, unique: true},
    password: String,
    teacherId: String,
    assignedDocs: { type: Array, default: [] }
})

module.exports = mongoose.model('Student', StudentSchema)