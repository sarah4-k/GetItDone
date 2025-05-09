const User = require('../models/User');
const bcrypt = require('bcryptjs');
const getRandomMessage = require("../models/message");

exports.showRegister = (req, res) => {
  res.render('register');
};

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
    req.session.userId = user._id;
    res.redirect('/dashboard');
  } catch (err) {
    res.send('Registration failed');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.send('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send('Incorrect password');
    req.session.userId = user._id;
    req.session.message = getRandomMessage();
    res.redirect('/dashboard');
  } catch (err) {
    res.send('Login failed');
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
