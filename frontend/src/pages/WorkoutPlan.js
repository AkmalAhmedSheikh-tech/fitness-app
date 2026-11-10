import React, { useState, useEffect } from "react";
import "../styles/global.css";
import "./WorkoutPlan.css"; // using code1 css theme
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function WorkoutPlan() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [exercises, setExercises] = useState([{ name: "", sets: "", reps: "" }]);
  const [plans, setPlans] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const res = await API.get("/workout");
      setPlans(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const addExerciseField = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "" }]);
  };

  const updateExercise = (index, field, value) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  const createPlan = async () => {
    if (!title.trim()) {
      setMsg("Title required");
      return;
    }

    const filtered = exercises.filter(
      (e) => e.name.trim() !== "" && e.sets && e.reps
    );

    if (filtered.length === 0) {
      setMsg("Add at least one exercise");
      return;
    }

    try {
      await API.post("/workout", { title, exercises: filtered });

      setTitle("");
      setExercises([{ name: "", sets: "", reps: "" }]);
      setMsg("Plan created!");
      loadPlans();
    } catch (err) {
      console.log(err);
    }
  };

  const deletePlan = async (id) => {
    if (!window.confirm("Delete this plan?")) return;

    try {
      await API.delete(`/workout/${id}`);
      loadPlans();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="plan-wrapper">

      <h2>Workout Planner</h2>

      {/* Main Create Card */}
      <div className="plan-grid" style={{ marginBottom: "25px" }}>

        {/* Create Plan Section */}
        <div className="plan-card" style={{ padding: "20px" }}>
          <h3>Create New Plan</h3>

          {/* Title */}
          <label>Plan Title</label>
          <input
            type="text"
            placeholder="e.g. Push Day"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="plan-input"
          />

          <label>Exercises</label>

          {exercises.map((ex, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <input
                placeholder="Exercise"
                value={ex.name}
                onChange={(e) =>
                  updateExercise(index, "name", e.target.value)
                }
                className="plan-input"
              />

              <input
                type="number"
                placeholder="Sets"
                value={ex.sets}
                onChange={(e) =>
                  updateExercise(index, "sets", e.target.value)
                }
                className="plan-input"
              />

              <input
                type="number"
                placeholder="Reps"
                value={ex.reps}
                onChange={(e) =>
                  updateExercise(index, "reps", e.target.value)
                }
                className="plan-input"
              />
            </div>
          ))}

          <div className="plan-btn-row">
            <button className="blue-btn" onClick={addExerciseField}>
            + Add Exercise
            </button>
            <button className="black-btn" onClick={createPlan}>
            Save Plan
            </button>
          </div>
          {msg && (
            <p style={{ color: "green", marginTop: 10, fontWeight: 600 }}>
              {msg}
            </p>
          )}
        </div>

        {/* Existing Plans */}
        <div className="plan-card" style={{ padding: "20px" }}>
          <h3>Your Workout Plans</h3>

          {plans.length === 0 ? (
            <p>No plans created yet.</p>
          ) : (
            plans.map((plan) => (
              <div
                key={plan._id}
                style={{
                  padding: "12px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #eee",
                  marginBottom: "12px",
                }}
              >
                <h4>{plan.title}</h4>

                {plan.exercises.map((ex, i) => (
                  <p key={i} style={{ margin: 3 }}>
                    • {ex.name} — {ex.sets} sets × {ex.reps} reps
                  </p>
                ))}

                <button
                  onClick={() => deletePlan(plan._id)}
                  className="reset-btn"
                  style={{ marginTop: 10 }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Home Button */}
      <button className="home-btn" onClick={() => navigate("/")}>
        ⬅ Go Home
      </button>
    </div>
  );
}
