const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User'); // Make sure to create a User model

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback',
  }, async (token, tokenSecret, profile, done) => {
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value,
    };

    try {
      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        done(null, user);
      } else {
        user = await new User(newUser).save();
        done(null, user);
      }
    } catch (err) {
      console.error('Error creating user:', err);
      done(err, null);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
