import React from 'react';
import MessageItem from '../../molecules/MessageItem/MessageItem';
import InputField from '../../atoms/InputField/InputField';
import Button from '../../atoms/Button/Button';
import styles from './Chat.module.scss';

const Chat = ({ messages = [], onSendMessage, onMessageChange, messageInput }) => (
  <div className="chat">
    <div className={styles.messageContainer}>
      {messages.map((msg, index) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
    <div className={styles.messageInput}>
      <InputField value={messageInput} onChange={onMessageChange} />
      <Button onClick={onSendMessage}>Send</Button>
    </div>
  </div>
);

export default Chat;