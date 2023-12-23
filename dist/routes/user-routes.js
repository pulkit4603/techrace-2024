"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userControllers = require("../controllers/user-controllers.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/new_user", _userControllers.newUser); //temp removing auth
router.get("/get_user/:tid", _userControllers.getUser); //temp removing auth
var _default = exports["default"] = router;