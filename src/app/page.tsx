"use client";
import Header from "@Components/Nav/Header";
import React from "react";
import styles from "./page.module.scss";

const Home = () => {
  return (
    <div className={styles.body}>
      <Header />
      <div>quality content</div>
    </div>
  );
};

export default Home;
