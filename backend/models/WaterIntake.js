// backend/models/WaterIntake.js
const mongoose = require("mongoose");

const WaterIntakeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true }
  },
  { timestamps: true } // ✅ this fixes "Invalid Date"
);

module.exports = mongoose.model("WaterIntake", WaterIntakeSchema);
