import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      setMsg(res.data.message || "");

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
      }

    } catch (err) {
      // Catch backend 400/401 errors
      if (err.response) {
        setMsg(err.response.data.error || "Invalid email or password");
      } else {
        setMsg("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="container" style={{ paddingTop: "30px", maxWidth: "400px" }}>
      <h2>Login</h2>

      <input
        style={{ width: "100%", marginBottom: "15px" }}
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={{ width: "100%", marginBottom: "15px" }}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button 
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: "8px",
          width: "100%"
        }}
      >
        Login
      </button>

      {msg && (
        <p style={{ marginTop: "12px", color: "red", fontWeight: "500" }}>
          {msg}
        </p>
      )}
    </div>
  );
}
