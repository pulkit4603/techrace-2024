"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userControllers = require("../controllers/user-controllers.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/new", _userControllers.newUser);
router.get("/:tid", _userControllers.getUser);
router.post("/clues/add", _userControllers.addClue);
router.get("/clues/:cid", _userControllers.getClue);
router.get("/rt/:tid", _userControllers.rtUser);
router.get("/", function (req, res) {
  res.status(200).send("Hello from User Routes.");
});
var _default = exports["default"] = router;