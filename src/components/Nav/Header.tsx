import Link from "next/link";
import styles from "./Header.module.scss";
const Header = () => {
  const links = { about: "about", blog: "blog", commands: "cmd" };
  return (
    <header className={styles.header}>
      <ul className={styles.navList}>
        {Object.entries(links).map(([display, to]) => {
          return (
            <li className={styles.navItem}>
              <Link href={to}>{display}</Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Header;
