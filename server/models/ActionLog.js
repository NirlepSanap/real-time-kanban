const mongoose = require("mongoose");

const actionLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  timestamp: { type: Date, default: Date.now }
});

module.exports =
  mongoose.models.ActionLog || mongoose.model("ActionLog", actionLogSchema);
