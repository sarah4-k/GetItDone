const Task = require("../models/Task");
const User = require("../models/User");
const defaultCategories = [
  "Work",
  "Personal",
  "School",
  "Financial",
  "hygiene",
];
const getRandomMessage = require('../models/message');
exports.getDashboard = async (req, res) => {
  try {
    if (!req.session.userId) return res.redirect("/login");

    const sort = req.query.sort || "date";

    let sortObj = {};
    switch (sort) {
      case "priority":
        sortObj = { priority: 1 };
        break;
      case "category":
        sortObj = { category: 1 };
        break;
      case "date":
      default:
        sortObj = { dueDate: 1 };
        break;
    }

    const tasks = await Task.find({ userId: req.session.userId }).sort(sortObj);
    const user = await User.findById(req.session.userId);
    if (!user) return res.redirect("/login");

    const categories = [...new Set([...defaultCategories, ...(user.categories || [])])];
    let message = req.session.message || getRandomMessage();
    delete req.session.message;

    // تقسيم المهام حسب التاريخ
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const groupedTasks = {
      today: [],
      tomorrow: [],
      later: [],
    };

    tasks.forEach(task => {
      if (!task.dueDate) return groupedTasks.later.push(task);

      const taskDate = new Date(task.dueDate);
      if (taskDate.toDateString() === today.toDateString()) {
        groupedTasks.today.push(task);
      } else if (taskDate.toDateString() === tomorrow.toDateString()) {
        groupedTasks.tomorrow.push(task);
      } else {
        groupedTasks.later.push(task);
      }
    });

    res.render("layouts/dashboard", { groupedTasks, categories, message, sort });
  } catch (err) {
    console.error("❌ Error loading dashboard:", err);
    res.status(500).send("Server Error");
  }
};

exports.getAddTaskPage = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);

    if (!user) return res.redirect("/login");

    const categories = [
      ...new Set([...defaultCategories, ...(user.categories || [])]),
    ];

    res.render("dashboard/addTask", { categories });
  } catch (err) {
    console.error("❌ Error loading add task page:", err);
    res.status(500).send("Server Error");
  }
};

exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority, category } = req.body;

  try {
    // Create the task
    await Task.create({
      userId: req.session.userId,
      title,
      description,
      dueDate,
      priority,
      category,
    });

    // Save category if it's new
    const user = await User.findById(req.session.userId);
    if (!user.categories.includes(category)) {
      user.categories.push(category);
      await user.save();
    }

    res.redirect("/dashboard");
  } catch (err) {
    res.send("Error creating task");
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send('Server Error');
  }
};

exports.toggleComplete = async (req, res) => {
  try {
    const { isCompleted } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { isCompleted });
    res.sendStatus(200);
  } catch (err) {
    console.error('❌ Error toggling complete status:', err);
    res.status(500).send('Server error');
  }
};

exports.getEditTaskPage = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).send("Task not found");
    }

    const user = await User.findById(req.session.userId);

    if (!user) return res.redirect("/login");

    const categories = [
      ...new Set([...defaultCategories, ...(user.categories || [])]),
    ];

    res.render("dashboard/editTask", { task, categories });
  } catch (err) {
    console.error("❌ Error loading edit task page:", err);
    res.status(500).send("Server Error");
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, category } = req.body;

    await Task.findByIdAndUpdate(req.params.id, {
      title,
      description,
      dueDate,
      priority,
      category,
    });

    res.redirect("/dashboard");
  } catch (err) {
    console.error("❌ Error updating task:", err);
    res.status(500).send("Server Error");
  }
};


