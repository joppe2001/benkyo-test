import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { getServerById } from "../../../firebase/db";
import styles from "./ServerView.module.scss";
import { sendMessage } from "../../../firebase/db";
import { useAuthState } from "../../../store/authState";
import { doc, onSnapshot } from "firebase/firestore";
import {
  db,
  deleteMessage,
  editMessage,
  handleJoinServer,
  hasJoinedServer,
  getUsersFromServer,
  getUser
} from "../../../firebase/db";

import Button from "../../atoms/Button/Button";
import InputField from "../../atoms/InputField/InputField";
import MessageItem from "../../molecules/MessageItem/MessageItem";
// import UserList from "../../molecules/UserList/UserList";

export const ServerView = () => {
  const { serverId } = useParams();
  const [server, setServer] = useState({});
  const [message, setMessage] = useState(""); // For input value
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [subscribed, setSubscribed] = useState(
    localStorage.getItem(`subscribed_${serverId}`) === "true"
  );
  const [users, setUsers] = useState([]);
  const [isUsersVisible, setUsersVisibility] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsersFromServer(serverId);
      const userNames = await Promise.all(
        users.map(async (user) => {
          const userName = await getUser(user);
          return userName;
        })
      );
      setUsers(userNames);
    };
    fetchUsers();
  }, [serverId, server.users]);

  const { user } = useAuthState();

  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: !isFirstRender ? "auto" : "auto"
    });
  }, [isFirstRender]);


  useEffect(() => {
    scrollToBottom(false);
    setIsFirstRender(false);
  }, [scrollToBottom]);

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
        timestamp: new Date().toISOString()
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

  const handleDeleteMessage = async (index, messageId) => {
    await deleteMessage(serverId, messageId);
  };

  const handleJoin = async (serverId, userId) => {
    await handleJoinServer(serverId, userId);
    const hasSubscribed = await hasJoinedServer(serverId, userId);
    setSubscribed(hasSubscribed);
    localStorage.setItem(`subscribed_${serverId}`, hasSubscribed);

    // Update subscribed status after joining
    setSubscribed(true);
  };

  const userId = useAuthState().user;

  useEffect(() => {
    const checkSubscription = async () => {
      const hasSubscribed = localStorage.getItem(`subscribed_${serverId}`);
      setSubscribed(hasSubscribed === "true");
    };
    checkSubscription();
  }, [serverId, userId]);

  const toggleUsersVisibility = () => {
    setUsersVisibility((prevState) => !prevState);
  };

  return (
    <div className={styles.server}>
      {!subscribed && (
        <Button id={styles.joinButton} onClick={() => handleJoin(serverId, userId.uid)}>
          {subscribed ? "Joined" : "Join"}
        </Button>
      )}
      <div className={styles.chat}>
        <div className={styles.messageContainer} ref={messageContainerRef}>
          {server.messages &&
            server.messages.map((msg, index) => (
              <MessageItem
              key={msg.id}
              message={msg}
              serverId={serverId}
              editMessage={editMessage} // Pass the editMessage function directly
              onDelete={() => handleDeleteMessage(index, msg.id)}
            />            
            ))}
          <div ref={messagesEndRef} />
        </div>
        <div className={styles.messageInput}>
          <InputField
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
        {/* <UserList users={users} isVisible={isUsersVisible} toggleVisibility={toggleUsersVisibility} /> */}
      </div>
    </div>
  );
};
