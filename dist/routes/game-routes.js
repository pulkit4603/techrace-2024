"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _gameControllers = require("../controllers/game-controllers.js");
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//import auth from "../middleware/auth.js";
var router = _express["default"].Router();
router.get("/", function (req, res) {
  res.status(200).send("Hello from Game Routes.");
});
router.post("/powerUp", _gameControllers.powerUp);
router.post("/nextClue", _gameControllers.nextClue);
router.post("/gethint", _gameControllers.gethint);
var _default = exports["default"] = router;