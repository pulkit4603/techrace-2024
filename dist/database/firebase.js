"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var serviceAccountKey = {
  type: "service_account",
  project_id: "techrace-2024",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3trbu%40techrace-2024.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};
serviceAccountKey.private_key = process.env.SERVICE_ACCOUNT_KEY_PRIVATE_KEY;
serviceAccountKey.private_key_id = process.env.SERVICE_ACCOUNT_KEY_PRIVATE_KEY_ID;
serviceAccountKey.client_email = process.env.SERVICE_ACCOUNT_KEY_CLIENT_EMAIL;
serviceAccountKey.client_id = process.env.SERVICE_ACCOUNT_KEY_CLIENT_ID;
_firebaseAdmin["default"].initializeApp({
  credential: _firebaseAdmin["default"].credential.cert(serviceAccountKey),
  databaseURL: "https://techrace-2024-default-rtdb.firebaseio.com"
});
var db = _firebaseAdmin["default"].database();
var firebase_db = db.ref("/");
var _default = exports["default"] = firebase_db;