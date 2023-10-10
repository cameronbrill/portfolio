import Link from "next/link";
import styles from "./Header.module.scss";

interface NavAction {
  name: string;
  to?: string;
  do?: () => void;
}

const Header = () => {
  const links: NavAction[] = [
    {
      name: "home",
      to: "",
    },
    {
      name: "about",
      to: "about",
    },
    {
      name: "blog",
      to: "blog",
    },
    {
      name: "resume",
      do: () => {},
    },
  ];
  return (
    <header className={styles.header}>
      <ul className={styles.navList}>
        {links.map((action) => {
          return (
            <li key={action.name} className={styles.navItem}>
              {action.to && <Link href={action.to}>{action.name}</Link>}
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Header;
