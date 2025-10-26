import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";

// 1. Import the ThemeProvider you created
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 2. Wrap your App and ToastContainer with the ThemeProvider */}
    <ThemeProvider>
      <App />
      <ToastContainer />
    </ThemeProvider>
  </StrictMode>
);
