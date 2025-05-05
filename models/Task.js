const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  dueDate: { type: Date },
  priority: {
    type: Number,
    enum: [1, 2, 3], // 1 = High, 2 = Medium, 3 = Low
    default: 2
  },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);

