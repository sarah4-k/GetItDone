const Task = require("../models/Task");
const User = require("../models/User");
const defaultCategories = [
  "Work",
  "Personal",
  "School",
  "Financial",
  "hygiene",
];
exports.getDashboard = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/login");
    }

    const tasks = await Task.find({ userId: req.session.userId }).sort({
      priority: 1,

      dueDate: 1,
    });

    const user = await User.findById(req.session.userId);

    if (!user) return res.redirect("/login"); 

    const categories =[...new Set([...defaultCategories, ...(user.categories || [])])];
    
    res.render("layouts/dashboard", { tasks, categories });
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

exports.getDashboard = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/login");
    }

    const tasks = await Task.find({ userId: req.session.userId }).sort({
      priority: 1,
      dueDate: 1,
    });

    const user = await User.findById(req.session.userId);
    if (!user) return res.redirect("/login");

    const categories = [
      ...new Set([...defaultCategories, ...(user.categories || [])]),
    ];

    let message = req.session.message || getRandomMessage(); 
    delete req.session.message; 

    res.render("layouts/dashboard", { tasks, categories, message });
  } catch (err) {
    console.error("❌ Error loading dashboard:", err);
    res.status(500).send("Server Error");
  }
};

