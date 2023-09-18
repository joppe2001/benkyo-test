import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../../store/authState';
import { getUser } from '../../../firebase/db';

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

  if (!isLoggedIn) return <span>Please log in.</span>;

  return (
    <div>
      <span>Welcome, {userName}</span>
      <button onClick={onLogout}>Log Out</button>
    </div>
  );
};

export default UserDisplayName;
