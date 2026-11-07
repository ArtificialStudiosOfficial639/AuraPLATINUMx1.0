import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAPJ4zNDd6RQNzgGdU2la5z2srygjBIEHU",
  authDomain: "auraplatinum-83f42.firebaseapp.com",

  databaseURL: "https://auraplatinum-83f42-default-rtdb.firebaseio.com",

  projectId: "auraplatinum-83f42",
  storageBucket: "auraplatinum-83f42.firebasestorage.app",
  messagingSenderId: "632708091551",
  appId: "1:632708091551:web:6a608657d28963f0465caa",
  measurementId: "G-2PCWY38JE1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;