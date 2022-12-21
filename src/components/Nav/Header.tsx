import styles from "./Header.module.scss";
const Header = () => {
  const links = ["about", "blog", "commands"];
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
