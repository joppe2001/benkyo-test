import { getUsersFromServer } from "../../../firebase/db";
import { useState, useEffect } from "react";
import styles from "./Users.module.scss";

const Users = ({ serverId }) => {
    const [users, setUsers] = useState([]);
    const [isUsersVisible, setUsersVisibility] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsersFromServer(serverId);
            setUsers(users);
        };
        fetchUsers();
    }, [serverId]);

    const toggleUsersVisibility = () => {
        setUsersVisibility(prevState => !prevState);
    };

    return (
        <div className={isUsersVisible ? styles.usersDisplay : `${styles.usersDisplay} ${styles.hidden}`}>
            <button onClick={toggleUsersVisibility}>
                {isUsersVisible ? "✖" : "👥"}  {/* X icon when visible, Users icon when hidden. Replace with your preferred icons */}
            </button>
            {isUsersVisible && (
                <>
                    <h1>Users</h1>
                    <ul>
                        {users.map((user) => {
                            return <li key={user.id}>{user.displayName || "placeholder Name"}</li>;
                        })}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Users;
