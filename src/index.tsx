import React from "react";
import { createRoot } from "react-dom/client";
import Home from "@Pages/home";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { H } from "highlight.run";

H.init(process.env.REACT_APP_HIGHLIGHT_PROJ_ID, {
  environment: process.env.NODE_ENV,
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Router>
      <Home />
    </Router>
  </React.StrictMode>
);
