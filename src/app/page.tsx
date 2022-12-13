"use client";
import React, { useEffect } from "react";
import styles from "./page.module.scss";
import { getOs } from "@Utils/Utils";

const Home = () => {
  const [os, setOs] = React.useState<string>("");

  useEffect(() => {
    setOs(getOs());
  }, [setOs]);

  return <div className={styles.cta}>{os}</div>;
};

export default Home;
