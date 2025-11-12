
const passport = require('passport')
require('dotenv').config()

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,//env file se jo data aata ha usko ham kisis durasa file me isis trah use karte hai (process.env.)
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },

  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));




passport.serializeUser(function(user, done){
    done(null, user);
});


passport.deserializeUser(function(user, done){
    done(null, user);
});


