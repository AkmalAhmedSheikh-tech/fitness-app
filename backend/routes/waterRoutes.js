const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { addWater, getToday, getAll, resetToday } = require("../controllers/waterController");

router.post("/", protect, addWater);         // Add intake
router.get("/today", protect, getToday);     // Today entries
router.get("/", protect, getAll);            // Weekly graph
router.delete("/reset", protect, resetToday); // Reset today

module.exports = router;
