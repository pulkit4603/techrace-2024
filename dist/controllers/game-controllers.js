"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.powerUp = exports.nextClue = exports.gethint = void 0;
var _models = require("../models");
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } //hi dvd
var freezeTime = 10 * 60; //10 minutes
var freezeCooldownDuration = 15 * 60; //15 minutes
var invisibleTime = 10 * 60; //10 minutes
var meterOffTime = 15 * 60; //15 minutes
var numberOfRoutes = 5; //confirm with naman

var calculatePointsToAdd = function calculatePointsToAdd(askTimestamp, previousClueSolvedAtTime) {
  var basePoints = 20;
  var minusFrom = 60;
  console.log((0, _moment["default"])(askTimestamp).diff((0, _moment["default"])(previousClueSolvedAtTime), "minutes"));
  var bonusPoints = minusFrom - (0, _moment["default"])(askTimestamp).diff(previousClueSolvedAtTime, "minutes");
  console.log("bonusPoints");
  console.log(bonusPoints);
  var onClueUpPoints = basePoints + (bonusPoints < 0 ? 0 : bonusPoints);
  console.log("onClueUpPoints");
  console.log(onClueUpPoints); //80

  return onClueUpPoints;
};
var futureUndo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(teamID, payload, freeTimeInMilli) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          setTimeout(function () {
            (0, _models.rtUpdateTeamData)(teamID, payload);
          }, freeTimeInMilli);
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function futureUndo(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var swap = function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
var objectify = function objectify(arr, n) {
  var obj = {};
  for (var i = 1; i <= n; i++) {
    obj["c".concat(i)] = arr[i];
  }
  return obj;
};
var checkIfDiscount = function checkIfDiscount(teamData, costBeforeCoupon, powerUpName) {
  console.log(powerUpName in teamData);
  if (powerUpName in teamData) {
    if (teamData[powerUpName] > 0) {
      return 0;
    }
  }
  return costBeforeCoupon;
};
var freezeTeam = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(teamID, payload, res, isForReverseFreeze) {
    var teamData, costBeforeDiscount, costOfReverseFreeze, cost, opponentData, updatedBalance, toUpdateSameTeam;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _models.rtGetTeamData)(teamID);
        case 2:
          teamData = _context2.sent;
          costBeforeDiscount = 125;
          costOfReverseFreeze = 175;
          cost = isForReverseFreeze ? costOfReverseFreeze : checkIfDiscount(teamData, costBeforeDiscount, "freezeTeamCoupon");
          _context2.next = 8;
          return (0, _models.rtGetTeamData)(payload.opponentTeamID);
        case 8:
          opponentData = _context2.sent;
          if (cost > teamData.currentBalance) {
            res.json({
              status: "0",
              message: "Failed: Insufficient points."
            });
          } else if (opponentData.isFrozen) {
            res.json({
              status: "0",
              message: "Failed: Opponent Team is already frozen. Please try again later."
            });
          } else if (!isForReverseFreeze && (0, _moment["default"])(payload.askTimestamp).diff((0, _moment["default"])(opponentData.madeFrozenAtTime), "seconds") < freezeTime + freezeCooldownDuration) {
            res.json({
              status: "0",
              message: "Failed: Cooldown period is on of Opponent Team. Please try again later."
            });
          } else {
            (0, _models.rtUpdateTeamData)(payload.oppTeamID, {
              madeFrozenBy: isForReverseFreeze ? "-999" : teamID,
              isFrozen: true,
              madeFrozenAtTime: payload.askTimestamp
            });
            updatedBalance = teamData.currentBalance - cost;
            toUpdateSameTeam = {
              balance: updatedBalance
            };
            if (cost == 0) {
              toUpdateSameTeam.freezeTeamCoupon = teamData.freezeTeamCoupon - 1;
            }
            (0, _models.rtUpdateTeamData)(teamID, toUpdateSameTeam);
            futureUndo(payload.oppTeamID, {
              isFrozen: false
            }, freezeTime * 1000);
            res.json({
              status: "1",
              message: "Opponent Team Frozen Successfully.",
              updated_balance: updatedBalance
            });
          }
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function freezeTeam(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
var invisible = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(teamID, payload, res) {
    var cost, teamData, updatedBalance;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          cost = 130;
          _context3.next = 3;
          return (0, _models.rtGetTeamData)(teamID);
        case 3:
          teamData = _context3.sent;
          if (!(cost > teamData.currentBalance)) {
            _context3.next = 7;
            break;
          }
          res.json({
            status: "0",
            message: "Insufficient points."
          });
          return _context3.abrupt("return");
        case 7:
          if (!teamData.isInvisible) {
            _context3.next = 10;
            break;
          }
          res.json({
            status: "0",
            message: "You are already invisible"
          });
          return _context3.abrupt("return");
        case 10:
          updatedBalance = teamData.currentBalance - cost;
          (0, _models.rtUpdateTeamData)(teamID, {
            isInvisible: true,
            balance: updatedBalance,
            isMadeInvisibleAtTime: payload.askTimestamp
          });
          futureUndo(teamID, {
            isInvisible: false
          }, invisibleTime * 1000);
          res.json({
            status: "1",
            message: "You have become invisible for the next 10 minutes"
          });
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function invisible(_x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();
var meterOff = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(teamID, payload, res) {
    var costBeforeDiscount, oppTeamData, teamData, cost, updated_balance, toUpdateSameTeam;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          costBeforeDiscount = 100;
          _context4.next = 3;
          return (0, _models.rtGetTeamData)(payload.oppTeamID);
        case 3:
          oppTeamData = _context4.sent;
          _context4.next = 6;
          return (0, _models.rtGetTeamData)(teamID);
        case 6:
          teamData = _context4.sent;
          cost = checkIfDiscount(teamData, costBeforeDiscount, "meterOffCoupon");
          if (!(cost > payload.current_balance)) {
            _context4.next = 11;
            break;
          }
          res.json({
            status: "0",
            message: "Failed: Insufficient points."
          });
          return _context4.abrupt("return");
        case 11:
          if (!oppTeamData.isMeterOff) {
            _context4.next = 14;
            break;
          }
          res.json({
            status: "0",
            message: "Failed: Opponent Team's meter is already off."
          });
          return _context4.abrupt("return");
        case 14:
          updated_balance = payload.current_balance - cost;
          futureUndo(payload.opp_teamID, {
            isMeterOff: false
          }, meterOffTime * 1000);
          res.json({
            status: "1",
            message: "Opponent Team's Meter Turned Off Successfully.",
            updated_balance: updated_balance
          });
          (0, _models.rtUpdateTeamData)(payload.opp_teamID, {
            isMeterOff: true,
            madeMeterOffAtTime: payload.ask_timestamp
          });
          toUpdateSameTeam = {
            balance: updated_balance
          };
          if (cost == 0) {
            toUpdateSameTeam.meterOffCoupon = teamData.meterOffCoupon - 1;
          }
          console.log("toUpdateSameTeam");
          console.log(toUpdateSameTeam);
          (0, _models.rtUpdateTeamData)(teamID, toUpdateSameTeam);
        case 23:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function meterOff(_x11, _x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();
var reverseFreezeTeam = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(teamID, payload, res) {
    var cost, teamData;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          cost = 175;
          _context5.next = 3;
          return (0, _models.rtGetTeamData)(teamID);
        case 3:
          teamData = _context5.sent;
          if (cost > teamData.currentBalance) {
            res.json({
              status: "0",
              message: "Failed: Insufficient points."
            });
          } else if ((0, _moment["default"])(payload.askTimestamp).diff(teamData.madeFrozenAtTime, "seconds") > 60) {
            res.json({
              status: "0",
              message: "Failed: Can't reverse freeze a team after 60 seconds."
            });
          } else {
            payload.oppTeamID = teamData.madeFrozenBy;
            (0, _models.rtUpdateTeamData)(teamID, {
              isFrozen: false,
              madeFrozenAtTime: (0, _moment["default"])().subtract(freezeTime + freezeCooldownDuration + 60 * 60, "seconds").format()
            });
            freezeTeam(teamID, payload, res, true);
          }
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function reverseFreezeTeam(_x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();

//@pulkit-gpt to be discussed
var skipLocation = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(teamID, res) {
    var costBeforeDiscount, teamData, cost, onClueUpPoints, toUpdate;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          costBeforeDiscount = 600;
          _context6.next = 3;
          return (0, _models.rtGetTeamData)(teamID);
        case 3:
          teamData = _context6.sent;
          cost = checkIfDiscount(teamData, costBeforeDiscount, "skipLocationCoupon");
          if (!(cost > teamData.currentBalance)) {
            _context6.next = 8;
            break;
          }
          res.json({
            status: "0",
            message: "Insufficient points."
          });
          return _context6.abrupt("return");
        case 8:
          if (!(teamData.currentClueIndex > 12)) {
            _context6.next = 11;
            break;
          }
          res.json({
            status: "0",
            message: "This Power Card cannot be used on final location."
          });
          return _context6.abrupt("return");
        case 11:
          if (!(teamData.noSkipUsed >= 1)) {
            _context6.next = 16;
            break;
          }
          res.json({
            status: "0",
            message: "You can have Skipped a Location 1 time already.\nYou cannot use this Power Card now."
          });
          return _context6.abrupt("return");
        case 16:
          res.json({
            status: "1",
            message: "Location skipped."
          });
          onClueUpPoints = 20; //base points
          toUpdate = {
            balance: teamData.currentBalance - cost + onClueUpPoints,
            current_clue_no: teamData.currentClueIndex + 1,
            noSkipUsed: 8,
            //ranodm number more than 1
            previousClueSolvedAtTime: teamData.askTimestamp,
            hint1: "-999",
            hint2: "-999"
          };
          if (cost == 0) {
            toUpdate.skipLocationCoupon = teamData.skipLocationCoupon - 1;
          }
          (0, _models.rtUpdateTeamData)(teamID, toUpdate);
        case 21:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function skipLocation(_x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var addLocation = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(teamID, payload, res) {
    var costBeforeDiscount, teamData, cost, opponentData, updatedBalance, toUpdateSameTeam, opponentRoute, opponentRouteArray, extraRoute, extraLocation;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          costBeforeDiscount = 100;
          _context7.next = 3;
          return (0, _models.rtGetTeamData)(teamID);
        case 3:
          teamData = _context7.sent;
          cost = checkIfDiscount(teamData, costBeforeDiscount, "addLocCoupon");
          _context7.next = 7;
          return (0, _models.rtGetTeamData)(payload.oppTeamID);
        case 7:
          opponentData = _context7.sent;
          if (!(cost > teamData.currentBalance)) {
            _context7.next = 13;
            break;
          }
          res.json({
            status: "0",
            message: "Insufficient points."
          });
          return _context7.abrupt("return");
        case 13:
          if (!(opponentData.currentClueIndex > 12 || opponentData.extraLoc >= 1)) {
            _context7.next = 18;
            break;
          }
          res.json({
            status: "0",
            message: "This Power Card cannot be used on this team."
          });
          return _context7.abrupt("return");
        case 18:
          res.json({
            status: "1",
            message: "An extra location has been added to the opponent team."
          });
          updatedBalance = teamData.currentBalance - cost;
          (0, _models.rtUpdateTeamData)(payload.oppTeamID, {
            extraLoc: 10 //random number more than 1,
          });
          toUpdateSameTeam = {
            balance: updatedBalance
          };
          if (cost == 0) {
            toUpdateSameTeam.addLocCoupon = teamData.addLocCoupon - 1;
          }
          (0, _models.rtUpdateTeamData)(teamID, toUpdateSameTeam);
          _context7.next = 26;
          return (0, _models.rtGetRoute)(payload.oppTeamID);
        case 26:
          opponentRoute = _context7.sent;
          opponentRouteArray = opponentRoute.values();
          extraRoute = opponentData.routeIndex + 1 == numberOfRoutes ? opponentData.routeIndex - 1 : opponentData.routeIndex + 1;
          extraLocation = "".concat(extraRoute).concat(opponentData.currentClueIndex);
          opponentRouteArray.splice(opponentData.currentClueIndex, 0, extraLocation);
          (0, _models.rtUpdateRoute)(payload.oppTeamID, objectify(opponentRouteArray, 14));
          return _context7.abrupt("return");
        case 33:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function addLocation(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var mysteryCard = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(teamID, payload, res) {
    var costBeforeDiscount, teamData, cost, opponentData, updatedBalance, toUpdateSameTeam, opponentRoute, opponentRouteArray;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          costBeforeDiscount = 100;
          _context8.next = 3;
          return (0, _models.rtGetTeamData)(teamID);
        case 3:
          teamData = _context8.sent;
          cost = checkIfDiscount(teamData, costBeforeDiscount, "mysteryCardCoupon");
          _context8.next = 7;
          return (0, _models.rtGetTeamData)(payload.oppTeamID);
        case 7:
          opponentData = _context8.sent;
          if (!(cost > teamData.currentBalance)) {
            _context8.next = 13;
            break;
          }
          res.json({
            status: "0",
            message: "Insufficient points."
          });
          return _context8.abrupt("return");
        case 13:
          if (!(opponentData.currentClueIndex > 12 || opponentData.mystery >= 1)) {
            _context8.next = 18;
            break;
          }
          res.json({
            status: "0",
            message: "This Power Card cannot be used on this team."
          });
          return _context8.abrupt("return");
        case 18:
          res.json({
            status: "1",
            message: "A mystery card has been added to the opponent team."
          });
          updatedBalance = teamData.currentBalance - cost;
          (0, _models.rtUpdateTeamData)(payload.oppTeamID, {
            mystery: 10 //random number more than 1,
          });
          toUpdateSameTeam = {
            balance: updatedBalance
          };
          if (cost == 0) {
            toUpdateSameTeam.mysteryCardCoupon = teamData.mysteryCardCoupon - 1;
          }
          (0, _models.rtUpdateTeamData)(teamID, toUpdateSameTeam);
          _context8.next = 26;
          return (0, _models.rtGetRoute)(payload.oppTeamID);
        case 26:
          opponentRoute = _context8.sent;
          opponentRouteArray = opponentRoute.values();
          swap(opponentRouteArray, opponentData.currentClueIndex + 1, opponentData.currentClueIndex + 2);
          (0, _models.rtUpdateRoute)(payload.oppTeamID, objectify(opponentRouteArray, 13));
          return _context8.abrupt("return");
        case 31:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function mysteryCard(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();
var powerUp = exports.powerUp = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var payload, teamID, powerUpID;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          payload = req.body;
          teamID = payload.teamID; //@pulkit4603 to be discussed (-999)
          powerUpID = payload.power_up_id;
          _context9.t0 = powerUpID;
          _context9.next = _context9.t0 === "1" ? 6 : _context9.t0 === "2" ? 8 : _context9.t0 === "3" ? 10 : _context9.t0 === "4" ? 12 : _context9.t0 === "5" ? 14 : _context9.t0 === "6" ? 16 : _context9.t0 === "7" ? 18 : 20;
          break;
        case 6:
          freezeTeam(teamID, payload, res, false);
          return _context9.abrupt("break", 21);
        case 8:
          meterOff(teamID, payload, res);
          return _context9.abrupt("break", 21);
        case 10:
          invisible(teamID, payload, res);
          return _context9.abrupt("break", 21);
        case 12:
          reverseFreezeTeam(teamID, payload, res);
          return _context9.abrupt("break", 21);
        case 14:
          skipLocation(teamID, payload, res);
          return _context9.abrupt("break", 21);
        case 16:
          addLocation(teamID, payload, res);
          return _context9.abrupt("break", 21);
        case 18:
          mysteryCard(teamID, payload, res);
          return _context9.abrupt("break", 21);
        case 20:
          res.json({
            status: "0",
            message: "Invalid Power Up"
          });
        case 21:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function powerUp(_x25, _x26) {
    return _ref9.apply(this, arguments);
  };
}();
var nextClue = exports.nextClue = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(payload, res) {
    var teamID, teamData, onClueUpPoints, clueData, clueSent;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          teamID = payload.teamID;
          _context10.next = 3;
          return (0, _models.rtGetTeamData)(teamID);
        case 3:
          teamData = _context10.sent;
          onClueUpPoints = calculatePointsToAdd(payload.askTimestamp, teamData.previousClueSolvedAtTime);
          (0, _models.rtUpdateTeamData)(teamID, {
            currentClueIndex: teamData.currentClueIndex + 1,
            previousClueSolvedAtTime: payload.askTimestamp,
            balance: teamData.balance + onClueUpPoints
          });
          //@pulkit-gpt to be discussed
          _context10.next = 8;
          return (0, _models.rtGetClueData)(teamData.currentClueIndex, teamID);
        case 8:
          clueData = _context10.sent;
          clueSent = {
            clue: clueData.clue,
            clueType: clueData.clueType
          };
          res.json({
            status: "1",
            message: "Clue Data",
            clueData: clueSent
          });
          return _context10.abrupt("return");
        case 12:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function nextClue(_x27, _x28) {
    return _ref10.apply(this, arguments);
  };
}();
var gethint = exports.gethint = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var teamID, teamData, costHint1, costHint2, clueData, hint1Sent, hint2Sent;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          teamID = req.body.teamID;
          _context11.next = 3;
          return (0, _models.rtGetTeamData)(teamID);
        case 3:
          teamData = _context11.sent;
          costHint1 = 20;
          costHint2 = 40;
          _context11.next = 8;
          return (0, _models.rtGetClueData)("c".concat(teamData.currentClueIndex), teamID);
        case 8:
          clueData = _context11.sent;
          hint1Sent = {
            hint: clueData.hint1,
            hintType: clueData.hint1Type
          };
          hint2Sent = {
            hint: clueData.hint2,
            hintType: clueData.hint2Type
          };
          if (!(teamData.hint1 == -999 && teamData.balance >= costHint1)) {
            _context11.next = 17;
            break;
          }
          (0, _models.rtUpdateTeamData)(teamID, {
            balance: teamData.balance - costHint1,
            hint1: clueData.hint1,
            hint1Type: clueData.hint1Type
          });
          res.json({
            status: "1",
            message: "Hint 1",
            hint: hint1Sent
          });
          return _context11.abrupt("return");
        case 17:
          if (!(teamData.hint2 == -999 && teamData.balance >= costHint2)) {
            _context11.next = 23;
            break;
          }
          (0, _models.rtUpdateTeamData)(teamID, {
            balance: teamData.balance - costHint2,
            hint2: clueData.hint2,
            hint2Type: clueData.hint2Type
          });
          res.json({
            status: "1",
            message: "Hint 2",
            hint: hint2Sent
          });
          return _context11.abrupt("return");
        case 23:
          res.json({
            status: "0",
            message:
            //@pulkit-gpt to be discussed
            "Insufficient points, or you have already used both hints."
          });
          return _context11.abrupt("return");
        case 25:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function gethint(_x29, _x30) {
    return _ref11.apply(this, arguments);
  };
}();