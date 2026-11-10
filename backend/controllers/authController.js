// backend/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isNonEmptyString = (v) => typeof v === "string" && v.trim() !== "";

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    // Only accept plain, non-empty strings (blocks missing fields and
    // query-operator objects such as { "$ne": null }).
    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    if (name !== undefined && typeof name !== "string") {
      return res.status(400).json({ error: "Invalid name" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.json({ message: "Signup Successful" });

  } catch (err) {
    res.status(500).json({ error: "Signup failed", details: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // Reject non-string input: without this, { "email": { "$ne": null } }
    // matches an arbitrary user and only the password check stands in the way.
    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // return token + user profile data (without password)
    const { _id, name, email: e, height, weight, waterGoal } = user;
    res.json({ message: "Login successful", token, user: { id: _id, name, email: e, height, weight, waterGoal } });

  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};

// GET profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile", details: err.message });
  }
};

// UPDATE profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = (({ name, height, weight, waterGoal }) => ({ name, height, weight, waterGoal }))(req.body);
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-password");
    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ error: "Failed to update", details: err.message });
  }
};
