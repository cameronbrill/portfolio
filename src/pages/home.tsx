import React from "react";
import styles from "./home.module.scss";
import KBar from "@Components/KBar/KBar";
import { getOs } from "@Utils/Utils";

const Home = () => {
  return (
    <div>
      <div className={styles.text}>{getOs()}</div>
      <div className={styles.name}>cameron brill</div>
    </div>
  );
};

export default Home;
