// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';  // or correct relative path
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const publicLinks = [
    { name: "Home", path: "/" },
  ];

  const protectedLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Matches", path: "/matches" },
    { name: "Profile", path: "/profile" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  // Links to show in desktop & mobile
  const visibleLinks = isAuthenticated ? protectedLinks : publicLinks;

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Left side - Brand / Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="brand-icon">🧸</span>
          <span className="brand-text">RoomieRadar</span>
          <span className="brand-heart">♡</span>
        </Link>

        {/* Right side - Desktop Links */}
        <ul className="nav-links desktop-links">
          {visibleLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={closeMenu}
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {/* Conditional auth buttons (desktop) */}
          {isAuthenticated ? (
            <>
              <li>
                <span className="nav-user">
                  {user?.name ? `Hi, ${user.name}` : "Profile"}
                </span>
              </li>
              <li>
                <button className="nav-btn logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className="nav-btn login-btn"
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="nav-btn register-btn"
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
        <button className="mobile-close-btn" onClick={closeMenu}>
          ×
        </button>

        <ul className="mobile-links">
          {visibleLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "mobile-link active" : "mobile-link bouncy"
                }
                onClick={closeMenu}
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {/* Mobile auth buttons */}
          {isAuthenticated ? (
            <>
              <li>
                <span className="mobile-user">
                  {user?.name ? `Hi, ${user.name}` : "Profile"}
                </span>
              </li>
              <li>
                <button className="mobile-btn logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className="mobile-btn login-btn"
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="mobile-btn register-btn"
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;