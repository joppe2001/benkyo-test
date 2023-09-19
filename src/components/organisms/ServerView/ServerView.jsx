import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getServerById } from "../../../firebase/db";
import styles from "./ServerView.module.scss";
import { sendMessage } from "../../../firebase/db";
import { useAuthState } from "../../../store/authState";
import { doc, onSnapshot } from "firebase/firestore";
import {} from "../../../firebase/db";
import {
	db,
	userNameFromMessageSenderId,
	deleteMessage,
	editMessage,
	handleJoinServer,
	hasJoinedServer,
} from "../../../firebase/db";

export const ServerView = () => {
	const { serverId } = useParams();
	const [server, setServer] = useState({});
	const [message, setMessage] = useState(""); // For input value
	const [messageState, setMessageState] = useState({});
	const [displayNames, setDisplayNames] = useState({}); // For display names of users in server
	const [isFirstRender, setIsFirstRender] = useState(true);
	const [subscribed, setSubscribed] = useState(false);

	const { user } = useAuthState();

	const messagesEndRef = useRef(null);
	const messageContainerRef = useRef(null);

	const userName = async (senderId) => {
		const userName = await userNameFromMessageSenderId(senderId);
		return userName;
	};

	const scrollToBottom = (smooth = true) => {
		messagesEndRef.current?.scrollIntoView({
			behavior: !isFirstRender ? "smooth" : "auto",
		});
	};

	useEffect(() => {
		const fetchDisplayNames = async () => {
			const newDisplayNames = {};

			for (let msg of server.messages || []) {
				if (!newDisplayNames[msg.senderId]) {
					const name = await userName(msg.senderId);
					if (name) {
						newDisplayNames[msg.senderId] = name;
					}
				}
			}
			setDisplayNames(newDisplayNames);
		};
		fetchDisplayNames();
	}, [server.messages]);

	useEffect(() => {
		if (isFirstRender) {
			scrollToBottom(false);
			setIsFirstRender(false);
		} else {
			scrollToBottom();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [server.messages]);

	useEffect(() => {
		const getServer = async () => {
			const serverInfo = await getServerById(serverId);
			setServer(serverInfo);
			console.log(server);
		};

		getServer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serverId]);

	useEffect(() => {
		const serverDocRef = doc(db, "servers", serverId);
		const unsubscribe = onSnapshot(serverDocRef, (doc) => {
			if (doc.exists) {
				setServer(doc.data());
			}
		});
		return () => unsubscribe();
	}, [serverId]);
  
	const handleSendMessage = async () => {
		if (message.trim()) {
			const newMessage = {
				content: message,
				senderId: user.uid,
				timestamp: new Date().toISOString(),
			};

			await sendMessage(serverId, newMessage);
			setMessage("");
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const extractTime = (isoString) => {
		const date = new Date(isoString);
		const currentDate = new Date();

		// Extract the time
		const options = { hour: "2-digit", minute: "2-digit", hour12: true };
		const time = date.toLocaleTimeString("en-US", options);

		// Compare dates
		const diffInMilliseconds = currentDate - date;
		const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
		const diffInMinutes = Math.floor(diffInSeconds / 60);
		const diffInHours = Math.floor(diffInMinutes / 60);
		const diffInDays = Math.floor(diffInHours / 24);

		if (diffInSeconds < 60) {
			return ``;
		}
		if (diffInMinutes < 60) {
			return `${diffInMinutes} minutes ago`;
		} else if (diffInHours < 24) {
			return `${diffInHours} hours ago at ${time}`;
		} else if (diffInDays === 1) {
			return `Yesterday at ${time}`;
		} else if (diffInDays < 7) {
			return `${diffInDays} days ago at ${time}`;
		} else if (diffInDays < 14) {
			return `Last week at ${time}`;
		} else {
			return (
				date.toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
					year: "numeric",
				}) + ` at ${time}`
			);
		}
	};

	const handleEditMessage = (index) => {
		setMessageState({ ...messageState, [index]: "editing" });
	};

	const saveEditedMessage = async (index, newContent, messageId) => {
		await editMessage(serverId, messageId, newContent);
		setMessageState({ ...messageState, [index]: "normal" });
	};

	const handleDeleteMessage = async (index, messageId) => {
		await deleteMessage(serverId, messageId);
	};

	const handleJoin = async (serverId, userId) => {
		await handleJoinServer(serverId, userId);

		// Update subscribed status after joining
		setSubscribed(true);
	};

	const userId = useAuthState().user;

	useEffect(() => {
		const checkSubscription = async () => {
			const hasSubscribed = await hasJoinedServer(serverId, userId);
			setSubscribed(hasSubscribed);
		};

		checkSubscription();
	}, [serverId, userId]);

	return (
		<div className={styles.server}>
			<button
				onClick={() => !subscribed && handleJoin(serverId, userId.uid)}
				key={server.serverName}
				id={styles.joinButton}
			>
				{subscribed ? "Joined" : "Join"}
			</button>
			<div className={styles.chat}>
				<div className={styles.messageContainer} ref={messageContainerRef}>
					{server.messages &&
						server.messages.map((msg, index) => (
							<div key={msg.id} className={styles.messages}>
								<strong className={styles.userName}>
									<div>
										{displayNames[msg.senderId] || "Unknown"}{" "}
										<span className={styles.timeStamp}>
											{extractTime(msg.timestamp)}
										</span>
									</div>
									<div className={styles.settings}>
										<button
											className={styles.delete}
											onClick={() => handleDeleteMessage(index, msg.id)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="32"
												height="32"
												viewBox="0 0 24 24"
											>
												<path
													fill="currentColor"
													d="M8 9h8v10H8z"
													opacity=".3"
												/>
												<path
													fill="currentColor"
													d="m15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"
												/>
											</svg>
										</button>
										{messageState[index] !== "editing" && (
											<button
												onClick={() => handleEditMessage(index)}
												className={styles.edit}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="32"
													height="32"
													viewBox="0 0 24 24"
												>
													<path
														fill="currentColor"
														d="M3 21h3.75L17.81 9.94l-3.75-3.75L3 17.25V21zm2-2.92l9.06-9.06l.92.92L5.92 19H5v-.92zM18.37 3.29a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34z"
													/>
												</svg>
											</button>
										)}
									</div>
								</strong>{" "}
								{messageState[index] === "editing" ? (
									<input
										defaultValue={msg.content}
										onBlur={(e) =>
											saveEditedMessage(index, e.target.value, msg.id)
										}
									/>
								) : messageState[index] === "deleted" ? (
									<em>Message deleted</em>
								) : (
									msg.content
								)}
							</div>
						))}
					<div ref={messagesEndRef} />
				</div>
				<div className={styles.messageInput}>
					<input
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={handleKeyPress}
						placeholder="Type a message..."
					/>
					<button onClick={handleSendMessage}>Send</button>
				</div>
			</div>
		</div>
	);
};
