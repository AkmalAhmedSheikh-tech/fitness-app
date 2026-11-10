const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  addProgress,
  getProgress,
  deleteAllProgress,
  deleteOneProgress
} = require("../controllers/progressController");

router.post("/", protect, addProgress);
router.get("/", protect, getProgress);
router.delete("/", protect, deleteAllProgress);       // CLEAR ALL
router.delete("/:id", protect, deleteOneProgress);   // DELETE ONE

module.exports = router;
