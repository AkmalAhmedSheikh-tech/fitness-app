import React, { useState } from "react";
import "../styles/global.css";
import "./BmiCalorie.css"; 
import { useNavigate } from "react-router-dom";

export default function BmiCalorie() {
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("Moderately Active");

  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const [calories, setCalories] = useState(null);

  const calculate = () => {
    if (!height || !weight || !age) {
      alert("Please enter age, height and weight!");
      return;
    }

    // BMI calculation
    const hMeters = height / 100;
    const bmiValue = (weight / (hMeters * hMeters)).toFixed(1);
    setBmi(bmiValue);

    // BMI Status
    if (bmiValue < 18.5) setStatus("Underweight");
    else if (bmiValue < 24.9) setStatus("Normal");
    else if (bmiValue < 29.9) setStatus("Overweight");
    else setStatus("Obese");

    // Calorie estimation with activity levels
    let bmr = 10 * weight + 6.25 * height - 5 * age + 5; // Male assumed

    let multiplier = 1.55; // Default Moderately Active
    if (activity === "Lightly Active") multiplier = 1.375;
    if (activity === "Very Active") multiplier = 1.725;

    const calorieNeed = Math.round(bmr * multiplier);
    setCalories(calorieNeed);
  };

  return (
    <div className="bmi-wrapper">

      <h2>Smart Fitness Calculator</h2>

      <div className="form-box">

        {/* Age */}
        <label>Age</label>
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        {/* Weight */}
        <label>Weight (kg)</label>
        <input
          type="number"
          placeholder="Enter your weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        {/* Height */}
        <label>Height (cm)</label>
        <input
          type="number"
          placeholder="Enter your height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        {/* Activity Level */}
        <label>Activity Level</label>
        <select value={activity} onChange={(e) => setActivity(e.target.value)}>
          <option>Lightly Active</option>
          <option>Moderately Active</option>
          <option>Very Active</option>
        </select>

        <button onClick={calculate}>Calculate</button>
      </div>

      {/* RESULTS CARD */}
      {bmi && (
        <div className="results">
          <p><strong>Your BMI:</strong> {bmi}</p>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Daily Calorie Needs:</strong> {calories} kcal/day</p>
        </div>
      )}

      {/* HOME BUTTON */}
      <button 
        className="home-btn"
        onClick={() => navigate("/")}
      >
        ⬅ Go Home
      </button>
    </div>
  );
}
