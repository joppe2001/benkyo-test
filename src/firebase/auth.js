// create a login function for firebase auth with email and password anbd sugnup function
import app from './config';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';

export const auth = getAuth(app);

export const login = (email, password) => {
    try {
        return signInWithEmailAndPassword(auth, email, password);
    }
    catch (error) {
        console.log(error);
    }
};

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// add an exportable dfunction to check if user is logged in

export const isLoggedIn = () => {
    return auth.currentUser !== null;
};
