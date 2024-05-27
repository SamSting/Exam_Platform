const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const client = new OAuth2Client('1939564990-6qvkcvi9jc0s11okocp1vgjujd3ttagr.apps.googleusercontent.com');

// Google OAuth
router.post('/google', async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '1939564990-6qvkcvi9jc0s11okocp1vgjujd3ttagr.apps.googleusercontent.com', // Google client ID
    });
    const payload = ticket.getPayload();
    const { sub, email, name, picture, given_name, family_name } = payload;

    const newUser = {
      googleId: sub,
      displayName: name,
      firstName: given_name, // Set firstName
      lastName: family_name, // Set lastName
      email,
      image: picture,
    };

    // Check if user exists
    let user = await User.findOne({ googleId: sub });
    if (user) {
      return res.status(200).json(user);
    }

    // Create a new user
    user = new User(newUser);
    await user.save();
    res.status(201).json(user);

  } catch (err) {
    console.error('Error during Google authentication:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Get current user
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
