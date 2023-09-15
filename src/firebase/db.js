import app from './config';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
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
  
