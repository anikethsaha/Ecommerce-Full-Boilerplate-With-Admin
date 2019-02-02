const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {localLogin} = require('./methods')
const AdminModel = require('../../model/admins')

passport.serializeUser((user, done) => {

    done(null, user._id);

});

passport.deserializeUser((_id, done) => {

    AdminModel.findById(_id).then((user) => {

        done(null, user);
    });
});





passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',

  },
  function(username, password, done) {

    localLogin(username,password,done);
  }
  ));


  module.exports = passport;