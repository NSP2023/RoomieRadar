const JwtStrategy = require('passport-jwt').Strategy,  //A Passport strategy is a specific method or plugin for the Passport.js authentication middleware 
                                            // in Node.js that defines how to authenticate users, 
                                            // handling different login mechanisms like username/password, 
                                            // social logins (Google, Facebook), or JSON Web Tokens (JWT).
    ExtractJwt = require('passport-jwt').ExtractJwt;
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const opts = {}
const UserModel = require('../models/User')
const passport = require('passport')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, 
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/users/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value
        if (!email.endsWith('@iut-dhaka.edu')) {
          return done(null, false, { message: 'only_iut_emails' })
        }
        let user = await UserModel.findOne({ googleId: profile.id });
        if (user) return done(null, user)
        user = await UserModel.findOne({ email });
        if (user) {
          user.googleId = profile.id
          if(!user.avatar|| user.avatar.includes('dicebear')) {
            user.avatar = profile.photos[0]?.value || 
          `https://api.dicebear.com/9.x/avataaars/svg?seed=${user._id}&backgroundColor=ffdfbf`
          }
          await user.save()
          return done(null, user)
        }
        user = await UserModel.create({
          googleId: profile.id,
          name: profile.displayName,
          email,
          avatar: profile.photos[0]?.value ||
            `https://api.dicebear.com/9.x/avataaars/svg?seed=${profile.id}&backgroundColor=ffdfbf`,
        })
        return done(null, user)
      } catch (err) {
        return done(err, false)
      }
    }
  )
)
module.exports = passport;