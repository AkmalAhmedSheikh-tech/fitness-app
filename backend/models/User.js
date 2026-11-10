// backend/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  height: { type: Number, default: 170 }, // cm
  weight: { type: Number, default: 70 },  // kg
  waterGoal: { type: Number, default: 2000 } // ml
});

module.exports = mongoose.model("User", UserSchema);
