"use strict";

var _express = _interopRequireDefault(require("express"));
var _userRoutes = _interopRequireDefault(require("./routes/user-routes.js"));
var _loginRoutes = _interopRequireDefault(require("./routes/login-routes.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
var port = process.env.PORT;
app.use(_express["default"].json());
app.listen(port, function () {
  console.log("Server is running on port http://localhost:".concat(port));
});
app.use("/users", _userRoutes["default"]);
app.use("/login", _loginRoutes["default"]);
app.get("/", function (req, res) {
  var nodeEnv = process.env.NODE_ENV;
  if (nodeEnv === "production") {
    console.log("running in production mode");
  }
  console.log("hi");
  res.send("v3 1254 Hello from Homepage.");
});