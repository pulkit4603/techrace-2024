"use strict";

var _express = _interopRequireDefault(require("express"));
var _firebase = _interopRequireDefault(require("./database/firebase"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var port = 5000;
var gayMan = _firebase["default"].child.gayman;
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});
app.get("/gay", function (req, res) {
  res.send({
    gayestManAlive: gayMan
  });
});