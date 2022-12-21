"use client";
import React, { useEffect } from "react";
import styles from "./page.module.scss";
import { getCommandName } from "lib/os/util";

const Home = () => {
  const [os, setOs] = React.useState<string>("");

  useEffect(() => {
    setOs(getCommandName());
  }, [setOs]);

  return <div className={styles.cta}>{os}</div>;
};

export default Home;
