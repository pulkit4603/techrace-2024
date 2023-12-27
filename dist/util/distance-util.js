"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distanceFinder = void 0;
var _getDistance = _interopRequireDefault(require("geolib/es/getDistance"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var distanceFinder = exports.distanceFinder = function distanceFinder(lat1, lon1, lat2, lon2) {
  return (0, _getDistance["default"])({
    latitude: lat1,
    longitude: lon1
  }, {
    latitude: lat2,
    longitude: lon2
  });
};
// @pulkit4603 handle errors (or joi/yup)