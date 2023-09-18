// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCYmniktFu5aue1FWQ6iecXyYSsyfctww",
  authDomain: "benkyo-inc.firebaseapp.com",
  projectId: "benkyo-inc",
  storageBucket: "benkyo-inc.appspot.com",
  messagingSenderId: "605538396885",
  appId: "1:605538396885:web:7677cd834c9412ca74505c",
  measurementId: "G-S94DEEQE80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;