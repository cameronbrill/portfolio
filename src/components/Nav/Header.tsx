import styles from "./Header.module.scss";
const Header = () => {
  const links = ["blog", "commands", "about"];
  return (
    <header className={styles.header}>
      <ul className={styles.navList}>
        {links.map((link) => (
          <li className={styles.navItem}>{link}</li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
