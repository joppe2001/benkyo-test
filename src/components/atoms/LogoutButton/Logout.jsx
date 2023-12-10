import styles from './Logout.module.scss';
import { isLoggedIn } from '../../../firebase/auth';

export const Logout = () => {
  return (
    <div className={styles.logOut}>
      {isLoggedIn ? (
        <>
          <span>Welcome, {userName}</span>
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <span>Please log in.</span>
      )}
    </div>
  );
};
