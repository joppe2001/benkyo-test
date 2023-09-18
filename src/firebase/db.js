import { query, where, getDocs, collection, getFirestore, doc, setDoc, getDoc, addDoc } from 'firebase/firestore';
import app from './config';
import { auth, login } from './auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const db = getFirestore(app);

export const createUser = async (email, password, displayName) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
  
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
  
        await setDoc(userDocRef, {
          uid: user.uid,
          email: email,
          displayName: displayName
        });
  
        console.log('User created and logged in successfully');
        login(email, password);
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
