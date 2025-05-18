// src/AuthListener.js
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function AuthListener() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User UID:", user.uid);
      } else {
        console.log("Not signed in");
      }
    });
  }, []);

  return null;
}

export default AuthListener;
