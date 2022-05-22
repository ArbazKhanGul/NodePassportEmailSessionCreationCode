const { compareSync } = require("bcrypt");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const User = require("./database");

passport.use(new LocalStrategy(
    function (username, password, done) {

        User.findOne({ username: username }, function (err, user) {

            if (err) { return done(err); } //When some error occurs

            if (!user) { return done(null, false, { message: "Incorrect username" }); } //when user not found

            if (!compareSync(password, user.password)) { return done(null, false, { message: "Incorrect password" }); } //when password is wrong

            return done(null, user); //When user is valid
        });
    }
));



passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });