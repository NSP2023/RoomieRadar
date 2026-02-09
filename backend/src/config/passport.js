const JwtStrategy = require('passport-jwt').Strategy,  //A Passport strategy is a specific method or plugin for the Passport.js authentication middleware 
                                            // in Node.js that defines how to authenticate users, 
                                            // handling different login mechanisms like username/password, 
                                            // social logins (Google, Facebook), or JSON Web Tokens (JWT).
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const UserModel = require('../models/userModel')
const passport = require('passport')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_Secret;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => { 
    try {
      const user = await UserModel.findById(jwt_payload.id);

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);


module.exports = passport;