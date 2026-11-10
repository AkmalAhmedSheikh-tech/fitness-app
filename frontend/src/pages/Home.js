// frontend/src/pages/Home.js
import React from "react";
import HomeCard from "../components/HomeCard";
import "../styles/Home.css";

import bmi from "../assets/icons/bmi.png";
import progress from "../assets/icons/progress.png";
import workout from "../assets/icons/workout.png";
import timer from "../assets/icons/timer.png";
import water from "../assets/icons/water.png";
import calendar from "../assets/icons/calendar.png";

export default function Home() {
  return (
    <div className="home-wrapper fade-in">

      <div className="home-header">
        <h1 className="home-title">Your Fitness Dashboard</h1>
        <p className="home-subtitle">
          Track your journey • Build habits • Stay consistent 💪
        </p>
      </div>

      <div className="home-grid">
        <HomeCard title="BMI & Calorie" image={bmi} link="/bmi" />
        <HomeCard title="Progress Tracker" image={progress} link="/progress" />
        <HomeCard title="Workout Plan" image={workout} link="/workout-plan" />
        <HomeCard title="Workout Timer" image={timer} link="/timer" />
        <HomeCard title="Water Intake Tracker" image={water} link="/water" />
        <HomeCard title="Workout Calendar" image={calendar} link="/calendar" />
      </div>

    </div>
  );
}
