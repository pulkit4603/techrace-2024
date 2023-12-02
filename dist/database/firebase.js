"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));
var _serviceAccountKey = _interopRequireDefault(require("../env/serviceAccountKey"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_firebaseAdmin["default"].initializeApp({
  credential: _firebaseAdmin["default"].credential.cert(_serviceAccountKey["default"]),
  databaseURL: "https://techrace-2024-default-rtdb.firebaseio.com"
});
var db = _firebaseAdmin["default"].database();
var ref = db.ref("/");
var _default = exports["default"] = ref;