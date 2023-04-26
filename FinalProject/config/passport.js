const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../modals/User');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'user',
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        console.log(req.body);
        //match user
        User.findOne({ $or: [{ email: email }, { username: req.body.user }] }).then((user) => {
          if (!user) {
            return done(null, false, { message: 'Email or Username is not Registered' });
          }
          //match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password is Incorrect' });
            }
          });
        });
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      let userFound = await User.findById(id);
      if (userFound != null) {
        console.log('Found User!');
      }
      done(null, userFound);
    } catch (e) {
      console.log('User not found: ', e);
    }
  });
};
