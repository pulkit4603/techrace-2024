"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firestore_db = exports.firebaseApp = void 0;
var _app = require("firebase/app");
var _firestore = require("firebase/firestore");
var _firebaseConfig = _interopRequireDefault(require("../../env/firebaseConfig.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var firebaseApp = exports.firebaseApp = (0, _app.initializeApp)(_firebaseConfig["default"]);
var firestore_db = exports.firestore_db = (0, _firestore.getFirestore)(firebaseApp);