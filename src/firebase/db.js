import { query, where, getDocs, collection, getFirestore, doc, setDoc, getDoc, addDoc } from 'firebase/firestore';
import app from './config';
import { auth, login } from './auth';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const db = getFirestore(app);

export const createUser = async (email, password, displayName) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
  
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
  
        await setDoc(userDocRef, {
          uid: user.uid,
          email: email,
          displayName: displayName,
          servers: []
        });
  
        console.log('User created and logged in successfully');
        login(email, password);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  export const createUserWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider());

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);

        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        });

        console.log('User created and logged in successfully');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
};



  export const getUser = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists) {
        return userDoc.data();
      } else {
        console.log('No such user!');
        return null;
      }
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  export const createServer = async (serverName, users = [], messages = []) => {
    try {
        const serverData = {
            serverName: serverName,
            users: users,
            messages: messages,
        };

        const serverDocRef = await addDoc(collection(db, 'servers'), serverData);
        console.log("Server created with ID: ", serverDocRef.id);
        return serverDocRef.id;
    } catch (error) {
        console.error("Error creating server:", error);
        return null;
    }
};

  export const getServer = async (serverName) => {
      try {
          const serversCollectionRef = collection(db, 'servers');
          const q = query(serversCollectionRef, where('serverName', '==', serverName));
  
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
              const serverDoc = querySnapshot.docs[0];
              return {
                  id: serverDoc.id,
                  ...serverDoc.data()
              };
          } else {
              console.log('No such server!');
              return null;
          }
      } catch (error) {
          console.error('Error getting server by name:', error);
          return null;
      }
  }

  export const getServerById = async (serverId) => {
    try {
      const serverDocRef = doc(db, 'servers', serverId);
      const serverDoc = await getDoc(serverDocRef);
  
      if (serverDoc.exists) {
        return {
          id: serverDoc.id,
          ...serverDoc.data()
        };
      } else {
        console.log('No such server!');
        return null;
      }
    } catch (error) {
      console.error('Error getting server by ID:', error);
      return null;
    }
  }

  export const getAllServers = async () => {
    try {
      const serversCollectionRef = collection(db, 'servers');
      const querySnapshot = await getDocs(serversCollectionRef);
  
      const servers = [];
      querySnapshot.forEach((doc) => {
        servers.push({
          id: doc.id,
          ...doc.data()
        });
      });
  
      return servers;
    } catch (error) {
      console.error('Error getting all servers:', error);
      return [];
    }
  }
  

export const sendMessage = async (serverId, message) => {
    try {
        const serverDocRef = doc(db, 'servers', serverId);
        const serverDoc = await getDoc(serverDocRef);

        if (serverDoc.exists) {
            const serverData = serverDoc.data();

            // Using Firestore's collection and addDoc to generate a unique ID for the message
            const messagesCollection = collection(serverDocRef, 'messages');
            const messageRef = await addDoc(messagesCollection, message);

            // The unique ID is now in messageRef.id
            const newMessage = {
                ...message,
                id: messageRef.id
            };

            serverData.messages.push(newMessage);
            await setDoc(serverDocRef, serverData);

            console.log("Message sent successfully with ID:", messageRef.id);
        } else {
            console.log('No such server!');
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}


export const deleteMessage = async (serverId, messageId) => {
  // only able to delete if you are the sender of the message
  try {
    const serverDocRef = doc(db, 'servers', serverId);
    const serverDoc = await getDoc(serverDocRef);

    if (serverDoc.exists) {
      const serverData = serverDoc.data();
      const messageIndex = serverData.messages.findIndex(message => message.id === messageId);

      if (messageIndex >= 0 && serverData.messages[messageIndex].senderId === auth.currentUser.uid) {
        serverData.messages.splice(messageIndex, 1);
        await setDoc(serverDocRef, serverData);
        console.log("Message deleted successfully");
      } else {
        console.log('No such message!');
      }
    } else {
      console.log('No such server!');
    }
  } catch (error) {
    console.error('Error deleting message:', error);
  }
}

export const editMessage = async (serverId, messageId, newContent) => {
  // only able to edit if you are the sender of the message
  try {
    const serverDocRef = doc(db, 'servers', serverId);
    const serverDoc = await getDoc(serverDocRef);

    if (serverDoc.exists) {
      const serverData = serverDoc.data();
      const messageIndex = serverData.messages.findIndex(message => message.id === messageId);

      if (messageIndex >= 0 && serverData.messages[messageIndex].senderId === auth.currentUser.uid) {
        serverData.messages[messageIndex].content = newContent; // changing 'message' to 'content'
        await setDoc(serverDocRef, serverData);
        console.log("Message edited successfully");
      } else {
        console.log('No such message!');
      }
    } else {
      console.log('No such server!');
    }
  } catch (error) {
    console.error('Error editing message:', error);
  }
}


export const userNameFromMessageSenderId = async (senderId) => {
  try {
    // Check if there's a user with the provided senderId (which should match a uid) in the users collection
    const userDocRef = doc(db, 'users', senderId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists) {
      console.log(`User with UID ${senderId} not found in users collection.`);
      return null;
    }

    // If the user exists, return the displayName
    const userData = userDoc.data();
    return userData.displayName;

  } catch (error) {
    console.error('Error getting user name from message sender id:', error);
  }
}


export const handleJoinServer = async (serverId, user) => {
    // have the user that joined added to the server's users array and the server added to the user's servers array and that user isnt able to join if theyre already joined
    try {
        const serverDocRef = doc(db, 'servers', serverId);
        const serverDoc = await getDoc(serverDocRef);

        if (serverDoc.exists) {
            const serverData = serverDoc.data();
            serverData.users.push(user);
            await setDoc(serverDocRef, serverData);

            const userDocRef = doc(db, 'users', user);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists) {
                const userData = userDoc.data();
                userData.servers.push(serverId);
                await setDoc(userDocRef, userData);
            } else {
                console.log('No such user!');
            }

            console.log("User joined server successfully");
        } else {
            console.log('No such server!');
        }
    } catch (error) {
        console.error('Error joining server:', error);
    }
}


export const hasJoinedServer = async (serverId, user) => {
    try {
        const serverDocRef = doc(db, 'servers', serverId);
        const serverDoc = await getDoc(serverDocRef);

        if (serverDoc.exists) {
            const serverData = serverDoc.data();
            return serverData.users.includes(user);
        } else {
            console.log('No such server!');
            return false;
        }
    } catch (error) {
        console.error('Error checking if user has joined server:', error);
        return false;
    }
}