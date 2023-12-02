import admin from "firebase-admin";
import serviceAccount from "../env/serviceAccountKey";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://techrace-2024-default-rtdb.firebaseio.com",
});
var db = admin.database();
var ref = db.ref("/");
export default ref;
