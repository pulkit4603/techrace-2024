"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;
var auth = exports.auth = function auth(req, res, next) {
  console.log("Auth middleware");
  next();
  return;
};