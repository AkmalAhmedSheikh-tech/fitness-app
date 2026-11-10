import React, { useEffect, useState } from "react";
import "../styles/global.css";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    height: "",
    weight: "",
    waterGoal: ""
  });

  const [msg, setMsg] = useState("");

  // Load the profile once on mount. (Without the [] dependency list this ran
  // after every render, re-fetching endlessly and overwriting what the user typed.)
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile");
      setForm({
        name: res.data.name || "",
        height: res.data.height || "",
        weight: res.data.weight || "",
        waterGoal: res.data.waterGoal || 2000
      });
    } catch (err) {
      if (err?.response?.status === 401) navigate("/login");
    }
  };

  // "" -> leave unchanged (key is dropped from the JSON body); otherwise a number
  const toNumber = (v) => (v === "" || v === null || v === undefined ? undefined : Number(v));

  const save = async () => {
    try {
      const res = await API.put("/profile", {
        name: form.name,
        height: toNumber(form.height),
        weight: toNumber(form.weight),
        waterGoal: toNumber(form.waterGoal)
      });
      const u = res.data.user || {};
      setForm({
        name: u.name || "",
        height: u.height || "",
        weight: u.weight || "",
        waterGoal: u.waterGoal || 2000
      });
      setMsg("Saved!");
      setTimeout(() => setMsg(""), 2000);
    } catch (err) {
      setMsg("Save failed");
      setTimeout(() => setMsg(""), 2000);
    }
  };

  return (
    <div className="container fade-in" style={{ paddingTop: 30 }}>
      {/* Back Home Button */}
      <button
        className="dark"
        style={{ marginBottom: 20 }}
        onClick={() => navigate("/")}
      >
        ← Home
      </button>

      {/* Profile Card */}
      <div
        className="card"
        style={{
          maxWidth: 420,
          margin: "auto",
          padding: 25,
          borderRadius: 16
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Profile</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Name */}
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Height */}
          <div>
            <label className="label">Height (cm)</label>
            <input
              type="number"
              placeholder="Enter height"
              value={form.height}
              onChange={(e) => setForm({ ...form, height: e.target.value })}
            />
          </div>

          {/* Weight */}
          <div>
            <label className="label">Weight (kg)</label>
            <input
              type="number"
              placeholder="Enter weight"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
            />
          </div>

          {/* Water Goal */}
          <div>
            <label className="label">Daily Water Goal (ml)</label>
            <input
              type="number"
              placeholder="Enter water goal"
              value={form.waterGoal}
              onChange={(e) => setForm({ ...form, waterGoal: e.target.value })}
            />
          </div>

          {/* Save Button */}
          <button
            className="primary"
            onClick={save}
            style={{ marginTop: 10 }}
          >
            Save
          </button>

          {/* Message */}
          {msg && (
            <p style={{ color: "green", fontWeight: 600, marginTop: 5 }}>
              {msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
