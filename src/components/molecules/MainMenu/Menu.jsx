import React, { useRef, useEffect, useState } from 'react';
import styles from "./Menu.module.scss";
import UserDisplayName from "../../atoms/UserName/UserName";
import { logOut } from "../../../firebase/auth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { getServer, getServerById } from '../../../firebase/db';

const MainNav = () => {
  const navigate = useNavigate();
  const navRef = useRef(null);
  const location = useLocation();
  const [history, setHistory] = useState([]);

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
    if (location.pathname !== "/") {
      const serverId = location.pathname.split("/")[2];
      getServerById(serverId).then((server) => {
        if (server) {
          const serverName = server.serverName;
          getServer(serverName).then((serverObj) => {
            if (serverObj) {
              setHistory((prevHistory) => {
                if (!prevHistory.some((item) => item.id === serverObj.id)) {
                  return [...prevHistory, { id: serverObj.id, name: serverObj.serverName }];
                }
                return prevHistory;
              });
            }
          });
        }
      });
    }
  }, [location]);

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
        {history.map((item) => (
          <li key={item.id} className={styles.navItem} onClick={toggleMenu}>
            <Link to={`/server/${item.id}`} className={styles.navLink}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <UserDisplayName onLogout={handleLogOut} />
    </div>
  );
};

export default MainNav;