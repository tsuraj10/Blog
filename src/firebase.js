
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDyB3TFWMLc_hHXm669BsIQI2MqmRun3so",
  authDomain: "blog-ad1f7.firebaseapp.com",
  projectId: "blog-ad1f7",
  storageBucket: "blog-ad1f7.firebasestorage.app",
  messagingSenderId: "714687797060",
  appId: "1:714687797060:web:149771b4d8b0501cbbe911",
  measurementId: "G-E3C8JX7P3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const blogCollection = collection(db, "blogs");