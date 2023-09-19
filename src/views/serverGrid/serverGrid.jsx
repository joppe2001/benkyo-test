import React, { useState, useEffect } from 'react';
import styles from './serverGrid.module.scss';
import {
  getAllServers
} from '../../firebase/db';
import { useNavigate } from 'react-router-dom';


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
	// addArs();
  }, []);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.serverGridContainer}>
        <div className={styles.grid}>
          <div className={styles.gridItemTitle}>My server list</div>
          {servers.map((server) => {
            return (
              <button
                className={styles.gridItem}
                onClick={() => handleServerClick(server.id)}
                key={server.id}
              >
                {server.serverName}
                <p>{server.users.length}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServerGrid;
