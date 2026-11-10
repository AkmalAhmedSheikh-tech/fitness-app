const Progress = require("../models/Progress");

// add progress
exports.addProgress = async (req, res) => {
  try {
    const { weight, calories } = req.body;

    const entry = await Progress.create({
      user: req.user._id,
      weight,
      calories
    });

    res.json({ message: "Added", entry });
  } catch (err) {
    res.status(500).json({ error: "Failed", details: err.message });
  }
};

// get all progress entries
exports.getProgress = async (req, res) => {
  try {
    const entries = await Progress.find({ user: req.user._id })
      .sort({ date: 1 });

    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Error fetching", details: err.message });
  }
};
// delete all progress
exports.deleteAllProgress = async (req, res) => {
  try {
    await Progress.deleteMany({ user: req.user._id });
    res.json({ message: "All progress cleared" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed", details: err.message });
  }
};
// delete single entry
exports.deleteOneProgress = async (req, res) => {
  try {
    const { id } = req.params;

    await Progress.findOneAndDelete({ _id: id, user: req.user._id });

    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed", details: err.message });
  }
};
