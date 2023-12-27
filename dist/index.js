"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _routes = _interopRequireDefault(require("./routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
var nodeEnv = process.env.NODE_ENV;
if (nodeEnv === "production") {
  console.log("Running in Production Mode");
} else console.log("Running in Development Mode");
app.use(_express["default"].json());
app.use("/", _routes["default"]);
app.get("/", function (req, res) {
  res.status(200).send("Hello from the TECHRACE Homepage.");
});
app.listen(port, function () {
  console.log("Server is running on port http://localhost:".concat(port));
});
module.exports = app;