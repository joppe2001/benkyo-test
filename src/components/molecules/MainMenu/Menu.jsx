import styles from './Menu.module.scss';
import UserDisplayName from '../../atoms/UserName/UserName';
import { logOut } from '../../../firebase/auth';
import { useNavigate } from 'react-router-dom';

const MainNav = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut().then(() => {
      navigate('/');
    });
  };
  return (
    <div className={styles.navContainer}>
      <ul>
        <li>menuItemn</li>
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
