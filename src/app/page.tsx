"use client";
import { getCommandName } from "lib/os/util";
import React, { useEffect } from "react";
import styles from "./page.module.scss";

const Home = () => {
  const [os, setOs] = React.useState<string>("");

  useEffect(() => {
    setOs(getCommandName());
  }, [setOs]);

  return <div className={styles.cta}>{os}</div>;
};

export default Home;
