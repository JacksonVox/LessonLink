const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const TeacherSchema = new mongoose.Schema({
    userType: { type: String, default: 'teacher' },
    userName: { type: String, unique: false },
    email: { type: String, unique: true},
    password: String,
})

TeacherSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Teacher', TeacherSchema)