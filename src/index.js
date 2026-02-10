// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/UserContext"; // named export: UserProvider
import "./styles/variables.css";
import "./styles/global.css";

// Optional: Only in development - helpful console message
if (process.env.NODE_ENV === "development") {
  console.log("RoomieRadar Frontend (development mode) is running 🚀");
  console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api");
}

// Get the root container
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root container (#root) not found in index.html");
}

// Create React 18+ root
const root = ReactDOM.createRoot(rootElement);

root.render(
  // <React.StrictMode>   ← comment this out
    <UserProvider>
      <App />
    </UserProvider>
  // </React.StrictMode>
);

// Optional: Enable Hot Module Replacement (HMR) during development
if (module.hot) {
  module.hot.accept();
}