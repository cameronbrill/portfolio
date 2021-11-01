import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { H } from "highlight.run";
import { ErrorBoundary } from "@highlight-run/react";

H.init(process.env.REACT_APP_HIGHLIGHT_PROJ_ID, {
  environment: "production",
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
