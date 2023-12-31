const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const { Teacher, Student } = require('../models/Users')

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    Teacher.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` })
      }
      if (!user.password) {
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err) }
        if (isMatch) {
          return done(null, user)
        }
        return done(null, false, { msg: 'Invalid email or password.' })
      })
    })
  }))
  

  passport.serializeUser((user, done) => {
    done(null, { id: user.id, type: user instanceof Student ? 'student' : 'teacher' });
  });
  
  passport.deserializeUser((data, done) => {
    if (data.type === 'teacher') {
      Teacher.findById(data.id, (err, user) => done(err, user));
    } else if (data.type === 'student') {
      Student.findById(data.id, (err, student) => done(err, student));
    }
  });
}
