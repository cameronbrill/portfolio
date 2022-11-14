import React from "react";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div className={styles.content}>{children}</div>
      <div className={styles.name}>cameron brill</div>
    </div>
  );
};

export default Layout;
