import admin from "firebase-admin";
// import * as dotenv from "dotenv";
// dotenv.config();
// const serviceAccount = JSON.parse(process.env.TEST_ENV);
import serviceAccount from "../../env/serviceAccountKey.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://techrace-2024-default-rtdb.firebaseio.com",
});

var db = admin.database();
var ref = db.ref("/");
export default ref;
