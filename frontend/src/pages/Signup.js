import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password
      });

      setMsg(res.data.message || "");
      
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.error || "Signup failed");
      } else {
        setMsg("Something went wrong.");
      }
    }
  };

  return (
    <div className="container" style={{ paddingTop: "30px", maxWidth: "400px" }}>
      <h2>Signup</h2>

      <input
        style={{ width: "100%", marginBottom: "15px" }}
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

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
        onClick={handleSignup}
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: "8px",
          width: "100%"
        }}
      >
        Signup
      </button>

      {msg && (
        <p style={{ marginTop: "12px", color: "red", fontWeight: "500" }}>
          {msg}
        </p>
      )}
    </div>
  );
}
