// ============================================================
// main.jsx — Application Entry Point
// Place this file at: src/main.jsx
// This is the first file Vite loads. It mounts React into the DOM.
// ============================================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Mount the React app into the <div id="root"> in index.html
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
