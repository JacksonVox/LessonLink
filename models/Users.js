const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
  userName: { type: String, unique: false },
  email: { type: String, unique: true },
  password: String,
  teacherId: { type: String, unique: false },
  accountType: { type: String, default: "teacher" }
})

const StudentSchema = new mongoose.Schema({
  userName: { type: String, unique: false },
  note: { type: String, unique: false },
  passKey: { type: String, unique: true },
  teacherId: { type: String, unique: false },
  accountType: { type: String, default: "student" },
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Documents' }],
  assignmentsCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Documents' }]
})


// Password hash middleware.
 
TeacherSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      if (!user.teacherId) {
        user.teacherId = user._id; // Set teacherId
      }
      next()
    })
  })
})

//Set teacherId on Student middleware.
StudentSchema.pre('save', function save(next) {
  const user = this
      if (!user.teacherId) {
        user.teacherId = user._id; // Set teacherId
      }
      next()
})


// Helper method for validating user's password.

TeacherSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}




const Teacher = mongoose.model('Teacher', TeacherSchema);
const Student = mongoose.model('Student', StudentSchema);

module.exports = { Teacher, Student };
