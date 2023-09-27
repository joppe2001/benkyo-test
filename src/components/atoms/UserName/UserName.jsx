import { useAuthState } from '../../../store/authState';
import styles from './UserName.module.scss';

const UserDisplayName = ({ onLogout }) => {
  const { isLoggedIn } = useAuthState();
  
  if (!isLoggedIn) return <span>Please log in.</span>;

  return (
    <div className={styles.userNameContainer}>
      <button onClick={onLogout}>Log Out</button>
    </div>
  );
};

export default UserDisplayName;
