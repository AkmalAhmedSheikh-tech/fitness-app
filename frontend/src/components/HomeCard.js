import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeCard({ title, image, link }) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(link)} style={{ cursor: "pointer" }}>
      <img src={image} alt={title} className="icon-img" />
      <h3>{title}</h3>
    </div>
  );
}
