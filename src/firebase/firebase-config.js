import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD38exHdmQRQQk1EAnBUsrXVJJF_xywhOs",
  authDomain: "wesleyan-youth-ph.firebaseapp.com",
  projectId: "wesleyan-youth-ph",
  storageBucket: "wesleyan-youth-ph.appspot.com",
  messagingSenderId: "908656326590",
  appId: "1:908656326590:web:d54f9ca7b8e1fb75ff2bef",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
