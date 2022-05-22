const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const UserModel = require('../configLocal/database')
const passport = require('passport')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Random string';

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    UserModel.findOne({ id: jwt_payload.id }, function (err, user) {
        if (err) {
            return done(err, false);

            // done 1st option error if any  error comes 
            // 2 pass the user 
            // 3 any additional parameter
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));