// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtxxzfWmv05Foe5wBT-_5PplL_vnb_Nwk",
  authDomain: "chat-app-react-dev.firebaseapp.com",
  databaseURL: "https://chat-app-react-dev-default-rtdb.firebaseio.com",
  projectId: "chat-app-react-dev",
  storageBucket: "chat-app-react-dev.firebasestorage.app",
  messagingSenderId: "937830290326",
  appId: "1:937830290326:web:c8ad245165c27649efc3b7",
  measurementId: "G-HLPQTECLEN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
export { db }