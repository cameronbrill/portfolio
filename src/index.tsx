import React from "react";
import { createRoot } from "react-dom/client";
import Home from "@Pages/home";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { H } from "highlight.run";
import LogRocket from "logrocket";
import KBar from "@Components/KBar/KBar";

H.init(process.env.REACT_APP_HIGHLIGHT_PROJ_ID, {
  environment: process.env.NODE_ENV,
  enableCanvasRecording: true,
});
LogRocket.init(`${process.env.REACT_APP_LOG_ROCKET_PROJ_ID}`);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Router>
      <KBar />
      <Home />
    </Router>
  </React.StrictMode>
);
