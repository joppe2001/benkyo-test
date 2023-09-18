import styles from './Menu.module.scss';
import UserDisplayName from '../../atoms/UserName/UserName';
import { logOut } from '../../../firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
// import { isLoggedIn } from '../../../firebase/auth';

const MainNav = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut().then(() => {
      navigate('/');
    });
  };

  // const userLoggedIn = isLoggedIn();
  return (
    <div className={styles.navContainer}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>menuItemn</li>
        <li>menuItemn</li>
        <li>
          <UserDisplayName onLogout={handleLogOut} />
        </li>
      </ul>
      <div className={styles.rightSide}></div>
    </div>
  );
};

export default MainNav;
