import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "chatapp-c530b.firebaseapp.com",
  projectId: "chatapp-c530b",
  storageBucket: "chatapp-c530b.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
export const realtimeDB = getDatabase();
firebase.initializeApp(firebaseConfig);

