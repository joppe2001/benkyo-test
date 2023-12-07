import React, { useEffect, useState } from "react";
import Button from "../../atoms/Button/Button";
import { userNameFromMessageSenderId } from "../../../firebase/db";
import styles from "./MessageItem.module.scss";
import { useAuthState } from "../../../store/authState";

const MessageItem = ({ message, serverId, editMessage, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const [displayName, setDisplayName] = useState("");

  const { user } = useAuthState();

  useEffect(() => {
    const fetchDisplayName = async () => {
      const name = await userNameFromMessageSenderId(message.senderId);
      setDisplayName(name);
    };
    fetchDisplayName();
  }, [message.senderId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditSave = async () => {
    if (isEditing) {
      if (editedContent.trim() === '') {
        setEditedContent(message.content);
      } else if (editedContent !== message.content) {
        await editMessage(serverId, message.id, editedContent);
      }
      setIsEditing(false);
    }
  };
  const handleContentChange = (event) => {
    setEditedContent(event.target.value);
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
      return `just now`;
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
          year: "numeric"
        }) + ` at ${time}`
      );
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleEditSave();
    }
  };

  return (
    <div className={styles.messageItem}>
      <div className={styles.userName}>
        {displayName}
        <span className={styles.timeStamp}>
          {extractTime(message.timestamp)}
        </span>
      </div>
      <div className={styles.messageContent}>
        {isEditing ? (
          <input
            type='text'
            value={editedContent}
            onChange={handleContentChange}
            className={styles.editInput}
            onKeyDown={handleKeyPress}
            autoFocus
          />
        ) : (
          <div className={styles.textContent}>{message.content}</div>
        )}
        <div className={styles.settings}>
          {user && message.senderId === user.uid && (
            <Button
              onClick={
                isEditing ? handleEditSave : handleEditToggle
              }
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
          )}
          {user && message.senderId === user.uid && (
            <Button onClick={() => onDelete(message.id)}>Delete</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
