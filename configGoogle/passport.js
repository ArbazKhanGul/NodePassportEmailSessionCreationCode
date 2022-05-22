var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User=require("./database");

passport.use(new GoogleStrategy({
    clientID: "48634327994-7o0jrp21603lovk9kjof0rrc79tj8ala.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/auth/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(accessToken,profile);

    User.findOne({ googleId: profile.id }, async function (err, user) {
if(err) return cb(err,null);
if(!user)
{
  let newUser=new User({
    googleid:profile.id,
    username:profile.displayName
  })
 await newUser.save();
  return cb(null,newUser);
}
else
      return cb(null, user);
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