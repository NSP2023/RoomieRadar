import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // start hidden

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Matches", path: "/matches" },
    { name: "Discovery", path: "/discovery" },
    { name: "Profile", path: "/profile" },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Arrow pull tab, always visible */}
      <button
        className="toggle-btn pull-tab"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? "→" : "←"}
      </button>

      {/* Sidebar itself */}
      <aside className={`sidebar ${isCollapsed ? "collapsed" : "expanded"}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">RoomieRadar</h2>
        </div>

        <nav className="sidebar-links">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-sidebar-link"
                  : "sidebar-link"
              }
            >
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
