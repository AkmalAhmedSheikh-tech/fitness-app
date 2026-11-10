const WorkoutPlan = require("../models/WorkoutPlan");

// Add a plan
exports.addPlan = async (req, res) => {
  try {
    const { title, exercises } = req.body;

    const plan = await WorkoutPlan.create({
      user: req.user._id,
      title,
      exercises
    });

    res.json({ message: "Plan created", plan });
  } catch (err) {
    res.status(500).json({ error: "Failed to create", details: err.message });
  }
};

// Get user plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed", details: err.message });
  }
};

// Delete plan
exports.deletePlan = async (req, res) => {
  try {
    await WorkoutPlan.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed", details: err.message });
  }
};
