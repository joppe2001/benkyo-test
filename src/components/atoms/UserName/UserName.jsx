import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../../store/authState';
import { getUser } from '../../../firebase/db';
import styles from './UserName.module.scss';

const UserDisplayName = ({ onLogout }) => {
  const { user, isLoggedIn } = useAuthState();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUser(user.uid);
        if (userInfo && userInfo.displayName) {
          setUserName(userInfo.displayName);
        } else {
          console.error(
            "User doesn't have a displayName or userInfo is undefined"
          );
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [isLoggedIn, user]);

  if (!isLoggedIn) return <span></span>;

  return (
    <div className={styles.userNameContainer}>
      <button onClick={onLogout}>Log Out</button>
    </div>
  );
};

export default UserDisplayName;
