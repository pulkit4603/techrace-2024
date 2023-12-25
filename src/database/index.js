import { firebaseRT, firestore } from "./firebase";
export { firebaseRT };
export const clueDB = firestore.collection("dev-clues");
export const teamDB = firestore.collection("dev-teams");
