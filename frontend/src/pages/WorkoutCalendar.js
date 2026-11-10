// frontend/src/pages/WorkoutCalendar.js
import React, { useState, useEffect } from "react";
import "../styles/global.css";
import "./WorkoutCalendar.css";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function WorkoutCalendar() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await API.get("/calendar");
      const formatted = res.data.map((e) => ({
        id: e._id,
        title: e.title,
        date: e.date
      }));
      setEvents(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  const addEvent = async () => {
    if (!selectedDate || !title.trim()) {
      setMsg("Select a date & enter workout name");
      return;
    }
    try {
      await API.post("/calendar", { title, date: selectedDate });
      setMsg("Event added!");
      setTitle("");
      loadEvents();
      setTimeout(() => setMsg(""), 1500);
    } catch (err) {
      console.log(err);
    }
  };

  const markDone = async () => {
    if (!selectedDate || !title.trim()) {
      setMsg("Select a date & enter workout");
      return;
    }
    try {
      await API.post("/calendar", {
        title: "✔ " + title,
        date: selectedDate
      });
      setMsg("Marked as Done!");
      setTitle("");
      loadEvents();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await API.delete(`/calendar/${id}`);
      loadEvents();
    } catch (err) {
      console.log(err);
    }
  };

  // ⭐ Selected date highlight fix
  const onDateClick = (info) => {
    setSelectedDate(info.dateStr);

    // Remove old selection
    document.querySelectorAll(".fc-daygrid-day").forEach((cell) => {
      cell.classList.remove("selected-date-cell");
    });

    // Highlight selected date
    const cell = document.querySelector(`[data-date='${info.dateStr}']`);
    if (cell) cell.classList.add("selected-date-cell");
  };

  return (
    <div className="calendar-page">

      <button className="home-btn-top" onClick={() => navigate("/")}>
        ← Home
      </button>

      <h2 className="title">Workout Calendar</h2>

      <div className="calendar-layout">

        {/* LEFT — Calendar */}
        <div className="calendar-box">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={onDateClick}
            height="550px"
            contentHeight="500px"
          />
        </div>

        {/* RIGHT — Sidebar */}
        <div className="sidebar-card">

          <h3>Add Workout</h3>

          <p className="selected-date">
            {selectedDate ? selectedDate : "← Click a date"}
          </p>

          <input
            type="text"
            className="event-input"
            placeholder="Workout (e.g. Chest Day)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button className="add-btn" onClick={addEvent}>
            Add Event
          </button>

          <button className="done-btn" onClick={markDone}>
            Mark as Done
          </button>

          {msg && <p className="msg">{msg}</p>}

          {/* Events list */}
          {selectedDate && (
            <div>
              <h4 className="event-list-title">Workouts on this day</h4>

              {events.filter((e) => e.date === selectedDate).length === 0 ? (
                <p className="no-events">No workouts yet.</p>
              ) : (
                events
                  .filter((e) => e.date === selectedDate)
                  .map((e) => (
                    <div key={e.id} className="event-line">
                      <span>{e.title}</span>
                      <button
                        className="delete-small"
                        onClick={() => deleteEvent(e.id)}
                      >
                        🗑
                      </button>
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

                  
                  