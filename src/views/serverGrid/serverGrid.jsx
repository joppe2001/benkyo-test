import React, {useState, useEffect} from "react";
import styles from "./serverGrid.module.scss";
import { getAllServers } from "../../firebase/db";

const ServerGrid = () => {
	const [servers, setServers] = useState([]);

	// const handleCreateServer = async () => {
	// 	// Here you can define the server name and any initial users or messages, if needed.
	// 	const serverName = "discord clone";
	// 	const initialUsers = [];  // Add any user IDs or user objects if needed.
	// 	const initialMessages = [];  // Add any initial message objects if needed.
	
	// 	const serverId = await createServer(serverName, initialUsers, initialMessages);
	// 	setServers([...servers, {serverName, id: serverId}]);
	// 	if (serverId) {
	// 		console.log(`Server created with ID: ${serverId}`);
	// 	} else {
	// 		console.error("Failed to create the server");
	// 	}
	// };
	

	const getServers = async () => {
		const servers = await getAllServers();
		setServers(servers);
	}

	useEffect(() => {
        getServers();
    }, []);
	
	return (
		<div className={styles.outerContainer}>
			{/* <button onClick={handleCreateServer}>click me</button> */}
			<div className={styles.serverGridContainer}>
				<div className={styles.grid}>
					<div className={styles.gridItemTitle}>Center Title</div>{" "}
					{servers.map((server) => {
						return (
							<button className={styles.gridItem} key={server.id}>
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
