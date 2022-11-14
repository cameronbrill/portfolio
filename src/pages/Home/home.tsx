import React from "react";
import styles from "./home.module.scss";
import { getOs } from "@Utils/Utils";

const Home = () => {
  return <div className={styles.cta}>{getOs()}</div>;
};

export default Home;
