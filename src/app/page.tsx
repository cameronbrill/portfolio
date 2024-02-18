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
  }, [setOs]);

  return <div className={styles.cta}>{os}</div>;
};

export default Home;
