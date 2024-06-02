const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const router = express.Router();
const client = new OAuth2Client('1939564990-6qvkcvi9jc0s11okocp1vgjujd3ttagr.apps.googleusercontent.com');

// Google OAuth
router.post('/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '1939564990-6qvkcvi9jc0s11okocp1vgjujd3ttagr.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();
    const { sub, email, name, picture, given_name, family_name } = payload;

    const newUser = {
      googleId: sub,
      displayName: name,
      firstName: given_name,
      lastName: family_name,
      email,
      image: picture,
    };

    let user = await User.findOne({ googleId: sub });
    if (user) {
      req.session.userId = user._id; // Store user ID in session
      return res.status(200).json(user);
    }

    user = new User(newUser);
    await user.save();
    req.session.userId = user._id; // Store user ID in session
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
router.get('/current_user', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const user = await User.findById(req.session.userId);
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching current user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Fetch user by email
router.get('/user', async (req, res) => {
  const { email } = req.query;

  try {
    console.log(`Fetching user with email: ${email}`); // Debug log
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user score
router.post('/update_score', async (req, res) => {
  const { email, score } = req.body;

  try {
    console.log(`Updating score for ${email} to ${score}`); // Debug log
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    user.lastScore = user.score;  // Save the current score as the last score
    user.score = score;
    await user.save();
    res.status(200).json({ message: 'Score updated successfully' });
  } catch (err) {
    console.error('Error updating score:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
