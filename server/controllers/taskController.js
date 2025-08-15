// server/controllers/taskController.js
const Task = require('../models/Task');
const ActionLog = require('../models/ActionLog');

// Create a task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = new Task({
      title,
      description,
      priority: priority || 'Medium'
    });

    await task.save();

    // Optional: Log action
    await ActionLog.create({
      user: null, // You can populate this later from auth
      action: `Created task: ${title}`
    });

    res.status(201).json(task);
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ message: 'Server error while creating task' });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching tasks' });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updated) return res.status(404).json({ message: 'Task not found' });

    await ActionLog.create({
      user: null,
      action: `Updated task: ${updated.title}`
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task' });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: 'Task not found' });

    await ActionLog.create({
      user: null,
      action: `Deleted task: ${deleted.title}`
    });

    res.json({ message: 'Task deleted', id: deleted._id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

// Get action logs
exports.getLogs = async (req, res) => {
  try {
    const logs = await ActionLog.find().sort({ createdAt: -1 }).limit(20);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Error loading logs' });
  }
};
