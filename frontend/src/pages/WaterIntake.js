// frontend/src/pages/WaterIntake.js
import React, { useEffect, useState } from "react";
import "../styles/global.css";
import "./WaterIntake.css";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function WaterIntake() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [entries, setEntries] = useState([]);
  const [total, setTotal] = useState(0);
  const [goal, setGoal] = useState(2000);
  const [msg, setMsg] = useState("");

  // Load page data
  // Run once on mount (without [] this re-fetched in an endless loop).
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    fetchToday();
  }, []);

  const fetchToday = async () => {
    try {
      const res = await API.get("/water/today");
      setEntries(res.data.entries || []);
      setTotal(res.data.total || 0);

      const p = await API.get("/profile");
      setGoal(p.data.waterGoal || 2000);
    } catch {}
  };

  // Add water entry
  const handleAdd = async () => {
    const ml = Number(amount);
    if (!ml || ml <= 0) return setMsg("Enter a valid amount (ml)");

    try {
      await API.post("/water", { amount: ml });
      setAmount("");
      setMsg("Water added!");
      fetchToday();
      setTimeout(() => setMsg(""), 2000);
    } catch {
      setMsg("Failed to add");
    }
  };

  // Reset daily water
  const handleReset = async () => {
    if (!window.confirm("Reset water intake for today?")) return;

    try {
      await API.delete("/water/reset");
      setEntries([]);
      setTotal(0);
      setMsg("Reset done");
      setTimeout(() => setMsg(""), 2000);
    } catch {
      setMsg("Reset failed");
    }
  };

  const pct = Math.min(100, Math.round((total / goal) * 100));

  return (
    <div className="water-wrapper fade-in">

      <button className="home-btn-top" onClick={() => navigate("/")}>← Home</button>

      <h2 className="title">Water Intake Tracker</h2>

      {/* MAIN CARD */}
      <div className="water-card">

        {/* Daily Goal (READ ONLY) */}
        <div className="goal-row">
          <p style={{ marginBottom: 4, fontWeight: 600 }}>Daily Goal</p>

          <div
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: "#f1f5f9",
              border: "1px solid #e5e7eb",
              fontWeight: 600
            }}
          >
            {goal} ml
          </div>

          <p style={{ fontSize: 13, color: "#555", marginTop: 6 }}>
            To change your water goal, go to <strong>Profile</strong>.
          </p>
        </div>

        {/* Add Water */}
        <div className="add-row">
          <input
            type="number"
            placeholder="Amount (ml)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        {msg && <p className="msg">{msg}</p>}

        {/* Progress */}
        <div className="progress-box">
          <p className="progress-text">{total} ml / {goal} ml</p>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>

          <p className="pct">{pct}% Complete</p>

          {/* 🌟 Daily Goal Status */}
          {total >= goal ? (
            <div style={{
              marginTop: 10,
              padding: "8px 14px",
              background: "#10b981",
              color: "white",
              borderRadius: 8,
              fontWeight: 600,
              textAlign: "center"
            }}>
              🎉 Goal Reached!
            </div>
          ) : (
            <div style={{
              marginTop: 10,
              padding: "8px 14px",
              background: "#facc15",
              color: "#444",
              borderRadius: 8,
              fontWeight: 600,
              textAlign: "center"
            }}>
              Not reached yet—Keep drinking.
            </div>
          )}
        </div>

        {/* Entries */}
        <h4>Today's Entries</h4>

        {entries.length === 0 ? (
          <p className="no-data">No entries yet</p>
        ) : (
          entries.map((e) => (
            <div key={e._id} className="entry-item">
              <strong>{e.amount} ml</strong>
              <span>{new Date(e.createdAt).toLocaleTimeString()}</span>
            </div>
          ))
        )}

        {/* Reset */}
        <div className="btn-row">
          <button className="reset-btn" onClick={handleReset}>Reset Day</button>
        </div>
      </div>
    </div>
  );
}
