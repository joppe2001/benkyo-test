import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getServerById, getUser } from '../../../firebase/db';
import styles from './ServerView.module.scss';
import { sendMessage } from '../../../firebase/db';
import { useAuthState } from '../../../store/authState';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/db';

export const ServerView = () => {
  const { serverId } = useParams();
  const [server, setServer] = useState({});
  const [message, setMessage] = useState(''); // For input value
  const { user } = useAuthState();


  useEffect(() => {
    const getServer = async () => {
      const server = await getServerById(serverId);
      setServer(server);
      console.log(server);
    };

    getServer();
  }, [serverId]);

  useEffect(() => {
    const serverDocRef = doc(db, 'servers', serverId);

    //real-time listener
    const unsubscribe = onSnapshot(serverDocRef, (doc) => {
        if (doc.exists) {
            setServer(doc.data());
        }
    });

    return () => unsubscribe();

}, [serverId]);


  // To send a message
  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        content: message,
        senderId: user.uid,
        timestamp: new Date().toISOString()
        // ... any other properties you need
      };

      await sendMessage(serverId, newMessage);

      // Clear the input
      setMessage('');
    }
  };

  return (
    <div className={styles.server}>
        <div className="collapsibleUsers">
            users
        </div>
      <div className="chat">
        <div className={styles.messageContainer}>
          {server.messages &&
            server.messages.map((msg, index) => (
              <div key={index} className={styles.messages}>
                {msg.content} - {}
              </div>
            ))}
        </div>
        <div className={styles.messageInput}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};
