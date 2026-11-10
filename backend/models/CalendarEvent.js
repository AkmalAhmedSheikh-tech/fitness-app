const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CalendarEvent", CalendarSchema);
