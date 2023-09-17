import React from "react";
import styles from "./serverGrid.module.scss";
import Menu from "../../components/molecules/MainMenu/Menu";

const ServerGrid = () => {
	// Dummy data to represent the servers you'll fetch from Firebase
	const servers = [
		{ id: "1", name: "Server 1" },
		{ id: "2", name: "Server 2" },
		{ id: "3", name: "Server 3" },
		{ id: "4", name: "Server 4" },
		{ id: "5", name: "Server 5" },
		{ id: "6", name: "Server 6" },
		{ id: "7", name: "Server 7" },
		{ id: "8", name: "Server 8" },
		{ id: "9", name: "Server 9" },
	];

	return (
		<div className={styles.outerContainer}>
            <Menu />
			<div className={styles.serverGridContainer}>
				<div className={styles.grid}>
					<div className={styles.gridItemTitle}>Center Title</div>{" "}
					{servers.map((server) => (
						<div key={server.id} className={styles.gridItem}>
							{server.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ServerGrid;
