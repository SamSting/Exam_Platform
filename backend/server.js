const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const cors = require('cors');
require('./config/passport')(passport); // Passport configuration

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:3000',  // Your frontend URL
  credentials: true
}));

// MongoDB connection
mongoose.connect('mongodb+srv://srijan:04822480@cluster01.dvy2j4p.mongodb.net/', { // Add your database name
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Session setup
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ 
    mongoUrl: 'mongodb+srv://srijan:04822480@cluster01.dvy2j4p.mongodb.net/',  // Add your database name
    collectionName: 'sessions'
  })
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
