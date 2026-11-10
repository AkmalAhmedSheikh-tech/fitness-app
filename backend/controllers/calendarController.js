const Calendar = require("../models/CalendarEvent");

// Add event
exports.addEvent = async (req, res) => {
  try {
    const { title, date } = req.body;

    const event = await Calendar.create({
      user: req.user._id,
      title,
      date
    });

    res.json({ message: "Event added", event });

  } catch (err) {
    res.status(500).json({ error: "Failed to add", details: err.message });
  }
};

// Get events
exports.getEvents = async (req, res) => {
  try {
    const events = await Calendar.find({ user: req.user._id }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch", details: err.message });
  }
};

// DELETE event
exports.deleteEvent = async (req, res) => {
  try {
    await Calendar.deleteOne({ _id: req.params.id, user: req.user._id });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete", details: err.message });
  }
};
