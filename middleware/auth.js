module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    },
    ensureTeacher: function (req, res, next) {
      if (req.user && req.user.accountType === 'teacher') {
        return next();
      } else if (req.user && req.user.accountType === 'student') {
        res.redirect('/studentHome/' + req.user._id)
      } else {
        res.status(403).send('Unauthorized'); // User is not a teacher, so respond with 403 Unauthorized
      }
    },
  }
  