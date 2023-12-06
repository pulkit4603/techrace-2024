import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../../env/firebaseConfig.js";
export const firebaseApp = initializeApp(firebaseConfig);
export const firestore_db = getFirestore(firebaseApp);
