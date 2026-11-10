import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token"));
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();

  // close dropdown when clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="nav-premium">
      <div className="nav-container">
        
        {/* Logo */}
        <h2 className="nav-logo" onClick={() => navigate("/")}>
          Fitness App
        </h2>

        {/* RIGHT SIDE */}
        <div className="nav-right">
          
          {token ? (
            <div className="profile-wrapper" ref={menuRef}>
              
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                className="avatar"
                alt="PFP"
                onClick={() => setOpenMenu(!openMenu)}
              />

              {openMenu && (
                <div className="dropdown">
                  <p onClick={() => navigate("/profile")}>Profile</p>
                  <p onClick={logout} className="logout">Logout</p>
                </div>
              )}

            </div>
          ) : (
            <div className="auth-btns">
              <button className="btn login" onClick={() => navigate("/login")}>
                Login
              </button>

              <button className="btn signup" onClick={() => navigate("/signup")}>
                Signup
              </button>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}
