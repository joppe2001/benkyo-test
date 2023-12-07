import React from "react";
import styles from "./UserList.module.scss";

const UserList = ({ users }) => (
  <ul>
    {users?.map((user) => {
      if (user && user.displayName) {
        return <li className={styles.userList} key={user.displayName}>{user.displayName}</li>;
      }
      return null;
    })}
  </ul>
);
export default UserList;
