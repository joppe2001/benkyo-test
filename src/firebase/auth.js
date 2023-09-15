// create a login function for firebase auth with email and password anbd sugnup function
import app from './config';
import {
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { createUser } from './db';

export const auth = getAuth(app);

export const login = (email, password) => {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};

export const signup = (email, password, displayName) => {
  return createUser(email, password, displayName);
};


export const isLoggedIn = () => {
  return auth.currentUser !== null;
};


export const logOut = () => {
  console.log('logout');
  return auth.signOut();
}