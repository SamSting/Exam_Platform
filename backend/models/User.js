const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  score: {
    type: Number,
    default: 0,
    
  },

  lastScore: {  // New field for last score
    type: Number,
    default: null,
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
