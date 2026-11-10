// backend/routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/authController");

router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);

module.exports = router;
