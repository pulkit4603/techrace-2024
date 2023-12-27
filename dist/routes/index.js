"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _loginRoutes = _interopRequireDefault(require("./login-routes.js"));
var _userRoutes = _interopRequireDefault(require("./user-routes.js"));
var _volunteerRoutes = _interopRequireDefault(require("./volunteer-routes.js"));
var _gameRoutes = _interopRequireDefault(require("./game-routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.use("/login", _loginRoutes["default"]);
router.use("/users", _userRoutes["default"]);
router.use("/volunteer", _volunteerRoutes["default"]);
router.use("/game", _gameRoutes["default"]);
var _default = exports["default"] = router;