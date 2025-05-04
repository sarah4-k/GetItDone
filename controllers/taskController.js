const Task = require('../models/Task');

exports.getDashboard = async (req, res) => {
  const tasks = await Task.find({ userId: req.session.userId }).sort({ dueDate: 1 });
  res.render('dashboard', { tasks });
};

exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority, category } = req.body;
  try {
    await Task.create({
      userId: req.session.userId,
      title,
      description,
      dueDate,
      priority,
      category
    });
    res.redirect('/dashboard');
  } catch (err) {
    res.send('Error creating task');
  }
};
