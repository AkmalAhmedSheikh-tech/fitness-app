const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { addPlan, getPlans, deletePlan } = require("../controllers/workoutController");

router.post("/", protect, addPlan);
router.get("/", protect, getPlans);
router.delete("/:id", protect, deletePlan);

module.exports = router;
