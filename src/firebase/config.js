import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHlq9BCxl1ofeUrhaPPeExaqab_cnOjx4",
  authDomain: "chat-app-ebe61.firebaseapp.com",
  projectId: "chat-app-ebe61",
  storageBucket: "chat-app-ebe61.appspot.com",
  messagingSenderId: "395875828668",
  appId: "1:395875828668:web:42705e99ba27090eeaa1b9",
  measurementId: "G-XTR75Z8SCD"
};

const fireware = initializeApp(firebaseConfig);
export const analytics = getAnalytics(fireware);
export const auth = getAuth();
export const db = getFirestore();

connectAuthEmulator(auth, "http://localhost:9099");
connectFirestoreEmulator(db, 'localhost', 8080);

export default fireware;
