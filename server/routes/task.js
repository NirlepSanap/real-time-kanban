// server/routes/task.js
const express = require("express");
const Task = require("../models/Task");
const ActionLog = require("../models/ActionLog");
const auth = require("../middleware/auth");

const router = express.Router();

// GET all tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedUser", "name");
    res.json(tasks);
  } catch (err) {
    console.error("Get tasks failed:", err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// POST create task
router.post("/", auth, async (req, res) => {
  console.log("➡️ Request body:", req.body);
  try {
    const { title, description, priority, assignedUser } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description: description || '',
      priority: priority || 'Medium',
      assignedUser: assignedUser || undefined
    });

    const io = req.app.get("io");

    await ActionLog.create({
      user: req.user.id,
      action: `created task "${title}"`,
      task: task._id
    });

    io.emit("task:created", task);
    res.status(201).json(task);
  } catch (err) {
    console.error("Create task failed:", err);
    res.status(500).json({ message: "Error creating task" });
  }
});

// PUT update task
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    updatedData.lastUpdatedAt = new Date();

    const task = await Task.findByIdAndUpdate(id, updatedData, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });

    const io = req.app.get("io");

    await ActionLog.create({
      user: req.user.id,
      action: `updated task "${task.title}"`,
      task: task._id
    });

    io.emit("task:updated", task);
    res.json(task);
  } catch (err) {
    console.error("Update task failed:", err);
    res.status(500).json({ message: "Error updating task" });
  }
});

// DELETE task
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const io = req.app.get("io");

    await ActionLog.create({
      user: req.user.id,
      action: `deleted task "${task.title}"`,
      task: task._id
    });

    io.emit("task:deleted", task._id);
    res.json({ message: "Task deleted", id });
  } catch (err) {
    console.error("Delete task failed:", err);
    res.status(500).json({ message: "Error deleting task" });
  }
});

// GET last 20 actions
router.get("/actions/logs", auth, async (req, res) => {
  try {
    const logs = await ActionLog.find()
      .sort({ timestamp: -1 })
      .limit(20)
      .populate("user", "name");
    res.json(logs);
  } catch (err) {
    console.error("Get logs failed:", err);
    res.status(500).json({ message: "Error loading logs" });
  }
});

module.exports = router;
