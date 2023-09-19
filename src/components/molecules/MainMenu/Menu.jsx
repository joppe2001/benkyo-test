import styles from './Menu.module.scss';
import UserDisplayName from '../../atoms/UserName/UserName';
import { logOut } from '../../../firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const MainNav = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        logOut().then(() => {
            navigate('/');
        });
    };

    const toggleMenu = () => {
        const menu = document.querySelector(`.${styles.navList}`);
        menu.classList.toggle(styles.active);
    };

    return (
        <div className={styles.navContainer}>
            <div className={styles.menuToggle} onClick={toggleMenu}>
                ☰
            </div>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link to="/" className={styles.navLink}>Home</Link>
                </li>
                <li className={styles.navLink}>menuItemn</li>
                <li className={styles.navLink}>menuItemn</li>
                <li className={styles.navLink}>
                    <UserDisplayName onLogout={handleLogOut} />
                </li>
            </ul>
            <div className={styles.rightSide}></div>
        </div>
    );
};

export default MainNav;
