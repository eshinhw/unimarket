import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// reducer is used to pull the data into the dataLayer
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
