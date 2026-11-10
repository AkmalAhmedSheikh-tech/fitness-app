// frontend/src/pages/ProgressTracker.js
import React, { useState, useEffect } from "react";
import "../styles/global.css";
import "./ProgressTracker.css";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function ProgressTracker() {
  const navigate = useNavigate();

  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");
  const [entries, setEntries] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getProgress();
  }, []);

  const getProgress = async () => {
    try {
      const res = await API.get("/progress");
      setEntries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addProgress = async () => {
    if (!weight || !calories) {
      setMsg("Please fill all fields!");
      return;
    }

    try {
      await API.post("/progress", { weight, calories });
      setMsg("Added!");
      setWeight("");
      setCalories("");
      getProgress();
    } catch (err) {
      console.log(err);
    }
  };

  const clearProgress = async () => {
    if (!window.confirm("Clear all progress?")) return;

    try {
      await API.delete("/progress");
      setEntries([]);
      setMsg("Cleared all progress.");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOne = async (id) => {
    if (!window.confirm("Delete this entry?")) return;

    try {
      await API.delete(`/progress/${id}`);
      getProgress();
    } catch (err) {
      console.log(err);
    }
  };

  // Chart Data
  const chartData = {
    labels: entries.map((e) =>
      new Date(e.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short"
      })
    ),
    datasets: [
      {
        label: "Weight (kg)",
        data: entries.map((e) => e.weight),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.15)",
        tension: 0.4,
        fill: true
      },
      {
        label: "Calories",
        data: entries.map((e) => e.calories),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.15)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  return (
    <div className="progress-wrapper">

      <h2>Progress Tracker</h2>

      {/* MAIN CARD */}
      <div className="progress-card">

        {/* FORM SECTION */}
        <div className="progress-form">
          <label>Weight (kg)</label>
          <input
            type="number"
            placeholder="Enter weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <label>Calories</label>
          <input
            type="number"
            placeholder="Enter calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />

          <button onClick={addProgress}>Add Progress</button>
          <button onClick={clearProgress} className="clear-btn">
            Clear All
          </button>

          {msg && <p style={{ color: "green" }}>{msg}</p>}
        </div>

        {/* CHART SECTION */}
        <div className="progress-chart">
          <h3>Your Progress</h3>
          <div className="chart-box">
            {entries.length === 0 ? (
              <p>No progress yet.</p>
            ) : (
              <Line data={chartData} height={200} />
            )}
          </div>
        </div>

      </div>

      {/* RECENT ENTRIES */}
      <div className="recent-activity">
        <h3>Recent Entries</h3>
        {entries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          <ul>
            {entries.map((e) => (
              <li key={e._id} className="entry-row">
                <span>
                  • {new Date(e.date).toLocaleDateString()} — {e.weight} kg,{" "}
                  {e.calories} cal
                </span>

                <button
                  className="delete-one"
                  onClick={() => deleteOne(e._id)}
                >
                  DELETE
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* HOME BUTTON */}
      <button className="home-btn" onClick={() => navigate("/")}>
        ⬅ Go Home
      </button>
    </div>
  );
}
