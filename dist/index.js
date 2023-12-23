"use strict";

var _express = _interopRequireDefault(require("express"));
var _userRoutes = _interopRequireDefault(require("./routes/user-routes.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _firebase = _interopRequireDefault(require("./database/firebase"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
var port = process.env.PORT;
var gayMan = _firebase["default"].child("gayman");
app.use(_express["default"].json());
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});
app.get("/gay", function (req, res) {
  res.json({
    gayestManAlive: gayMan
  });
});
app.use("/users", _userRoutes["default"]);
app.get("/", function (req, res) {
  return res.send("v3 1254 Hello from Homepage.");
});