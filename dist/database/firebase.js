"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));
var _serviceAccountKey = _interopRequireDefault(require("../../env/serviceAccountKey.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import * as dotenv from "dotenv";
// dotenv.config();
// const serviceAccount = JSON.parse(process.env.TEST_ENV);

_firebaseAdmin["default"].initializeApp({
  credential: _firebaseAdmin["default"].credential.cert(_serviceAccountKey["default"]),
  databaseURL: "https://techrace-2024-default-rtdb.firebaseio.com"
});
var db = _firebaseAdmin["default"].database();
var firebase_db = db.ref("/");
var _default = exports["default"] = firebase_db;