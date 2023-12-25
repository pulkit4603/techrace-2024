import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
    authDomain: "techrace-2024.firebaseapp.com",
    databaseURL: "https://techrace-2024-default-rtdb.firebaseio.com",
    projectId: "techrace-2024",
    storageBucket: "techrace-2024.appspot.com",
    messagingSenderId: "530110172044",
    appId: "1:530110172044:web:f51f5664915ae26500a4a9",
    measurementId: "G-9S0NKGYY95",
    apiKey: process.env.FIREBASE_CONFIG_API_KEY,
};

const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
