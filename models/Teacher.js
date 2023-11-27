const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const TeacherSchema = new mongoose.Schema({
    userType: { type: String, default: 'teacher' },
    name: { type: String, unique: false },
    email: { type: String, unique: true},
    password: String,
})

module.exports = mongoose.model('Teacher', TeacherSchema)