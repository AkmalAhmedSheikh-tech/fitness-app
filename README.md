# Fitness App

A full-stack fitness tracker: a React frontend with an Express + MongoDB backend.

## Features

- Sign up / login (JWT, bcrypt-hashed passwords) and a profile page
- BMI & daily calorie calculator
- Progress tracker with a weight/calorie chart (Chart.js)
- Workout planner (plans with exercises, sets and reps)
- Workout timer with audio cues
- Water intake tracker with a daily goal
- Workout calendar (FullCalendar)

## Project structure

```
backend/    Express 5 API (Mongoose models, JWT auth middleware, REST routes under /api)
frontend/   React 19 app (Create React App, React Router, Axios)
```

## Requirements

- Node.js 18+
- MongoDB running locally (default `mongodb://127.0.0.1:27017`)

## Setup

```bash
cd backend
npm install
cp .env.example .env        # then edit .env and set a strong JWT_SECRET
npm start                   # API on http://localhost:5000  (or: npm run dev)
```

In a second terminal:

```bash
cd frontend
npm install
npm start                   # app on http://localhost:3000
```

The frontend calls the API at `http://localhost:5000/api`.

## Tests

```bash
cd frontend
npm test
```
