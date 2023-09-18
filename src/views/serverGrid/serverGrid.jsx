import React, { useState, useEffect } from "react";
import styles from "./serverGrid.module.scss";
import { getAllServers } from "../../firebase/db";
import { useNavigate } from "react-router-dom";

const ServerGrid = () => {
    const [servers, setServers] = useState([]);
    const navigate = useNavigate(); // Use the useNavigate hook here

    const getServers = async () => {
        const servers = await getAllServers();
        setServers(servers);
    };

    const handleServerClick = (serverId) => {
        navigate(`/server/${serverId}`); // Use the navigate function here
    };

    useEffect(() => {
        getServers();
    }, []);
    
    return (
        <div className={styles.outerContainer}>
            <div className={styles.serverGridContainer}>
                <div className={styles.grid}>
                    <div className={styles.gridItemTitle}>My server list</div>
                    {servers.map((server) => {
                        return (
                            // You had an immediate invocation of handleServerClick, 
                            // which was also a potential issue. Fixing it here:
                            <button 
                                className={styles.gridItem} 
                                onClick={() => handleServerClick(server.id)} 
                                key={server.id}
                            >
                                {server.serverName}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ServerGrid;
