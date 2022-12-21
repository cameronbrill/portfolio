import Link from "next/link";
import styles from "./Header.module.scss";
const Header = () => {
  const links = ["about", "blog", "commands"];
  return (
    <header className={styles.header}>
      <ul className={styles.navList}>
        {links.map((link) => (
          <li className={styles.navItem}>
            <Link href={link}>{link}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
