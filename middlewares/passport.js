const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/schema/User');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({username: username, userRight: 'admin'}).lean();
      if (!user) {
        return done(null, false, { message: 'Incorrect username'});
      } 
      if (!validPassword(user, password)) {
        return done(null, false, { message: 'Incorrect password'});
      }
      console.log(user);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

function validPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
})

module.exports = passport;