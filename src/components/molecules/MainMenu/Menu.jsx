import React, { useRef, useEffect } from 'react';
import styles from "./Menu.module.scss";
import UserDisplayName from "../../atoms/UserName/UserName";
import { logOut } from "../../../firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const MainNav = () => {
  const navigate = useNavigate();
  const navRef = useRef(null);

  const handleLogOut = () => {
    logOut().then(() => {
      navigate("/");
    });
  };

  const toggleMenu = () => {
    const menu = navRef.current.querySelector(`.${styles.navList}`);
    menu.classList.toggle(styles.active);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        const menu = navRef.current.querySelector(`.${styles.navList}`);
        menu.classList.remove(styles.active);
      }
    };
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.navContainer} ref={navRef}>
      <div className={styles.menuToggle} onClick={toggleMenu}>
        ☰
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem} onClick={toggleMenu}>
          <Link to='/' className={styles.navLink}>
            Home
          </Link>
        </li>
        <li className={styles.navItem} onClick={toggleMenu}>
          <Link to='/' className={styles.navLink}>
            Home
          </Link>
        </li>
        <li className={styles.navItem} onClick={toggleMenu}>
          <Link to='/' className={styles.navLink}>
            Home
          </Link>
        </li>
      </ul>
          <UserDisplayName onLogout={handleLogOut} />
    </div>
  );
};

export default MainNav;
