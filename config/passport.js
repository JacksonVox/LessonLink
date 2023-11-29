const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const Teacher = require('../models/Teacher')
const Student = require('../models/Student')

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await Teacher.findOne({ email: email.toLowerCase() });

      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` });
      }

      if (!user.password) {
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' });
      }

      const isMatch = await user.comparePassword(password);

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { msg: 'Invalid email or password.' });
      }
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, { id: user.id, type: user instanceof Student ? 'Student' : 'Teacher' });
  });

  passport.deserializeUser(async (data, done) => {
    try {
      if (data.type === 'Teacher') {
        const user = await Teacher.findById(data.id);
        done(null, user);
      } else if (data.type === 'Student') {
        const student = await Student.findById(data.id);
        done(null, student);
      }
    } catch (err) {
      done(err);
    }
  });
}