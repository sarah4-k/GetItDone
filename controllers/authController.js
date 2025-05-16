const User = require('../models/User');
const bcrypt = require('bcryptjs');
const getRandomMessage = require("../models/message");

exports.showRegister = (req, res) => {
  res.render('register');
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
    req.session.userId = user._id;
    res.redirect('/dashboard');
  } catch (err) {
    let errorMsg = 'Registration failed';
    
    // تحقق من الخطأ إذا كان تكرار في username أو email
    if (err.code === 11000) {
      if (err.keyPattern.username) {
        errorMsg = 'Username is already taken';
      } else if (err.keyPattern.email) {
        errorMsg = 'Email is already registered';
      }
    }

    res.render('register', { error: errorMsg });
  }
};

exports.showLogin = (req, res) => {
  res.render('login', { error: '' }); // تمرير error كقيمة افتراضية
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    req.session.message = getRandomMessage();
    res.redirect('/dashboard');
  } catch (err) {
    res.render('login', { error: 'An error occurred during login' });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
