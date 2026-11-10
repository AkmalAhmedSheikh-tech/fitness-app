import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, '', '/');
});

test('renders the navbar and the home dashboard', () => {
  render(<App />);
  expect(screen.getByText(/fitness app/i)).toBeInTheDocument();
  expect(screen.getByText(/your fitness dashboard/i)).toBeInTheDocument();
});

test('shows all six feature cards on the home page', () => {
  render(<App />);
  [
    'BMI & Calorie',
    'Progress Tracker',
    'Workout Plan',
    'Workout Timer',
    'Water Intake Tracker',
    'Workout Calendar',
  ].forEach((title) => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});

test('shows Login and Signup buttons when logged out', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /signup/i })).toBeInTheDocument();
});
