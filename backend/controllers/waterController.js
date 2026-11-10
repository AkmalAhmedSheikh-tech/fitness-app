// backend/controllers/waterController.js
const Water = require("../models/WaterIntake");

// Add water entry
exports.addWater = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const entry = await Water.create({
      user: req.user._id,
      amount
    });

    res.json({ message: "Added", entry });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Get today's entries
exports.getToday = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const entries = await Water.find({
      user: req.user._id,
      createdAt: { $gte: start, $lte: end }  // ✅ now works because timestamps exists
    }).sort({ createdAt: -1 });

    const total = entries.reduce((sum, e) => sum + e.amount, 0);

    res.json({ entries, total });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Get all entries for weekly graph
exports.getAll = async (req, res) => {
  try {
    const entries = await Water.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json({ entries });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Reset today's entries
exports.resetToday = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    await Water.deleteMany({
      user: req.user._id,
      createdAt: { $gte: start, $lte: end }
    });

    res.json({ message: "Reset successful" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
