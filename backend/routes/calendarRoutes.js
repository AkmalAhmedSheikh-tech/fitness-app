const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { addEvent, getEvents, deleteEvent } = require("../controllers/calendarController");

router.post("/", protect, addEvent);
router.get("/", protect, getEvents);
router.delete("/:id", protect, deleteEvent);

module.exports = router;
