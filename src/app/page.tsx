"use client";

import React, { useEffect } from "react";

import styles from "./page.module.scss";

const getOs = () => {
  if (navigator.userAgent.includes("Mac")) {
    return "⌘+K";
  }
  return "ctrl+K";
};

const Home = () => {
  const [os, setOs] = React.useState<string>("");

  useEffect(() => {
    setOs(getOs());
  }, []);

  return (
    <div
      role="heading"
      aria-level={1}
      aria-valuetext={os}
      className={styles.cta}
    >
      {os}
    </div>
  );
};

export default Home;
