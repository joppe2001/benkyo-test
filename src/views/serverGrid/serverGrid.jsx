import React, { useState, useEffect } from "react";
import styles from "./serverGrid.module.scss";
import { getAllServers, handleJoinServer } from "../../firebase/db";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../store/authState";
// import { ErrorMessage } from "../../components/atoms/ErrorMessage/ErrorMessage";

const ServerGrid = () => {
	const [servers, setServers] = useState([]);
	// const [message, setMessage] = useState(""); // For input value
	const navigate = useNavigate(); // Use the useNavigate hook here

	const handleJoin = async (serverId, userId) => {
		return await handleJoinServer(serverId, userId)
			// .then(() => {
			// 	setMessage("You have successfully joined the server!");
			// 	// navigate(`/server/${serverId}`);
			// 	setTimeout(() => setMessage(""), 3000);
			// })
			// .catch(() => {
			// 	setMessage("you have already joined!");
			// 	setTimeout(() => setMessage(""), 3000);
			// });
	};

	const userId = useAuthState().user;
	console.log("userId", userId);

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
							<button
								className={styles.gridItem}
								onClick={() => handleServerClick(server.id)}
								key={server.id}
							>
								{server.serverName}
								<button
									onClick={() => handleJoin(server.id, userId.uid)}
									key={server.serverName}
									id={styles.joinButton}
								>
									subscribe
								</button>
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
