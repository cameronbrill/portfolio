import Link from "next/link";
import styles from "./Header.module.scss";
const Header = () => {
  const links = { home: "", about: "about", blog: "blog" };
  return (
    <header className={styles.header}>
      <ul className={styles.navList}>
        {Object.entries(links).map(([display, to]) => {
          return (
            <li key={display} className={styles.navItem}>
              <Link href={to}>{display}</Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Header;
