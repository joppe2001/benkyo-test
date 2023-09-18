import styles from './Logout.module.scss';
import { isLoggedIn } from '../../../firebase/auth';

export const Logout = () => {
  return (
    <div className={styles.logOut}>
      {isLoggedIn ? (
        <>
          {/* eslint-disable-next-line no-undef */}
          <span>Welcome, {userName}</span>
          {/* eslint-disable-next-line no-undef */}
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <span>Please log in.</span>
      )}
    </div>
  );
};
