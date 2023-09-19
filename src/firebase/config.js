import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCCYmniktFu5aue1FWQ6iecXyYSsyfctww",
  authDomain: "benkyo-inc.firebaseapp.com",
  projectId: "benkyo-inc",
  storageBucket: "benkyo-inc.appspot.com",
  messagingSenderId: "605538396885",
  appId: "1:605538396885:web:7677cd834c9412ca74505c",
  measurementId: "G-S94DEEQE80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics after the Firebase app initialization
getAnalytics(app);

export default app;
