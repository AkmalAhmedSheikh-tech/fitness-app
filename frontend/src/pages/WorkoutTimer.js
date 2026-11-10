// frontend/src/pages/WorkoutTimer.js
import React, { useState, useEffect, useRef } from "react";
import "../styles/global.css";
import { useNavigate } from "react-router-dom";

export default function WorkoutTimer() {
  const navigate = useNavigate();

  const [time, setTime] = useState(0);         // current time in seconds
  const [running, setRunning] = useState(false);
  const [setMin, setSetMin] = useState("");   // input minutes
  const [setSec, setSetSec] = useState("");   // input seconds
  const audioCtxRef = useRef(null);

  useEffect(() => {
    let interval;
    if (running && time > 0) {
      interval = setInterval(() => setTime(prev => prev - 1), 1000);
    }

    if (time === 0 && running) {
      beep(900, 200);
      setRunning(false);
    }

    return () => clearInterval(interval);
  }, [running, time]);

  const beep = (freq = 600, duration = 120) => {
    try {
      if (!audioCtxRef.current)
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      
      const ctx = audioCtxRef.current;
      const o = ctx.createOscillator();
      const g = ctx.createGain();

      o.type = "sine";
      o.frequency.setValueAtTime(freq, ctx.currentTime);

      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      o.connect(g);
      g.connect(ctx.destination);

      o.start();
      g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);

      setTimeout(() => {
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration / 1000);
        o.stop(ctx.currentTime + duration / 1000 + 0.02);
      }, duration - 10);

    } catch (err) {
      console.log("Beep error", err);
    }
  };

  const handleStartPause = () => {
    if (time <= 0) return;
    setRunning(prev => {
      const newRunning = !prev;
      beep(newRunning ? 700 : 400, 120);
      return newRunning;
    });
  };

  const reset = () => {
    setRunning(false);
    setTime(0);
    beep(300, 180);
  };

  const applyCustomTime = () => {
    const total = (parseInt(setMin) || 0) * 60 + (parseInt(setSec) || 0);
    if (total <= 0) {
      alert("Enter valid time");
      return;
    }
    setTime(total);
    beep(600, 150);
  };

  const formatTime = (s) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${String(hrs).padStart(2,"0")}:${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
  };

  return (
    <div className="container" style={{ paddingTop: 30 }}>

      {/* Home Button */}
      <button 
        onClick={() => navigate("/")} 
        style={{
          marginBottom: 20,
          padding: "10px 18px",
          background: "black",
          color: "white",
          borderRadius: 8,
          border: "none",
          cursor: "pointer"
        }}
      >
        ← Home
      </button>

      {/* Main Card */}
      <div className="card fade-in" style={{ maxWidth: 450, margin: "auto", padding: 30 }}>
        <h2 style={{ textAlign: "center" }}>Workout Timer</h2>

        {/* Time Display */}
        <h1 style={{ textAlign: "center", fontSize: 48, margin: "18px 0" }}>
          {formatTime(time)}
        </h1>

        {/* Custom Time Inputs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
          <input
            type="number"
            placeholder="Min"
            value={setMin}
            onChange={(e) => setSetMin(e.target.value)}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ddd"
            }}
          />
          <input
            type="number"
            placeholder="Sec"
            value={setSec}
            onChange={(e) => setSetSec(e.target.value)}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ddd"
            }}
          />
        </div>

        <button
          onClick={applyCustomTime}
          style={{
            width: "100%",
            marginBottom: 15,
            padding: "10px 12px",
            background: "#3498db",
            color: "white",
            borderRadius: 8,
            border: "none",
            cursor: "pointer"
          }}
        >
          Set Timer
        </button>

        {/* Controls */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={handleStartPause}
            style={{
              flex: 1,
              padding: "12px 10px",
              background: running ? "#e67e22" : "#2ecc71",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              cursor: "pointer"
            }}
          >
            {running ? "Pause" : "Start"}
          </button>

          <button
            onClick={reset}
            style={{
              flex: 1,
              padding: "12px 10px",
              background: "#e74c3c",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              cursor: "pointer"
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
