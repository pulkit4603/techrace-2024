"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firestore_db = exports.firebaseApp = void 0;
var _app = require("firebase/app");
var _firestore = require("firebase/firestore");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var firebaseConfig = {
  authDomain: "techrace-2024.firebaseapp.com",
  databaseURL: "https://techrace-2024-default-rtdb.firebaseio.com",
  projectId: "techrace-2024",
  storageBucket: "techrace-2024.appspot.com",
  messagingSenderId: "530110172044",
  appId: "1:530110172044:web:f51f5664915ae26500a4a9",
  measurementId: "G-9S0NKGYY95"
};
firebaseConfig.apiKey = process.env.FIREBASE_CONFIG_API_KEY;
var firebaseApp = exports.firebaseApp = (0, _app.initializeApp)(firebaseConfig);
var firestore_db = exports.firestore_db = (0, _firestore.getFirestore)(firebaseApp);