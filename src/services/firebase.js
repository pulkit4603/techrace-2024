import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();
const serviceAccountKey = {
    type: "service_account",
    project_id: "techrace-2024",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3trbu%40techrace-2024.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    private_key_id: process.env.PRIVATE_KEY_ID,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https://techrace-2024-default-rtdb.firebaseio.com",
});

const rtdb = admin.database();
export const firestoreDB = admin.firestore();
export const realtimeDB = rtdb.ref("/");
export const realtimeTeamDB = rtdb.ref("/dev-teams");
