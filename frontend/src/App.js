import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import BmiCalorie from "./pages/BmiCalorie";
import ProgressTracker from "./pages/ProgressTracker";
import WorkoutPlan from "./pages/WorkoutPlan";
import WorkoutTimer from "./pages/WorkoutTimer";
import WaterIntake from "./pages/WaterIntake";
import WorkoutCalendar from "./pages/WorkoutCalendar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bmi" element={<BmiCalorie />} />
        <Route path="/progress" element={<ProgressTracker />} />
        <Route path="/workout-plan" element={<WorkoutPlan />} />
        <Route path="/timer" element={<WorkoutTimer />} />
        <Route path="/water" element={<WaterIntake />} />
        <Route path="/calendar" element={<WorkoutCalendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
