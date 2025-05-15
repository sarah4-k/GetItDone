const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Require login middleware
function requireLogin(req, res, next) {
  if (!req.session.userId) return res.redirect('/login');
  next();
}

router.get('/dashboard', requireLogin, taskController.getDashboard);
router.get('/task/add', requireLogin, taskController.getAddTaskPage);
router.post('/task', requireLogin, taskController.createTask);
router.post('/task/:id/delete', requireLogin, taskController.deleteTask);
router.post('/task/:id/toggle-complete', requireLogin, taskController.toggleComplete);


module.exports = router;
