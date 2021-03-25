"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fs = require("fs");

var puppeteer = require("puppeteer-extra");

var express = require("express");

var path = require("path");

var morgan = require("morgan");

var cors = require("cors");

var bodyParser = require("body-parser");

var travelers = require("./carriers/travellers/index.js");

var geico = require("./carriers/geico/index.js");

var StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());
(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var page, response;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return puppeteer.launch({
            headless: false
          });

        case 2:
          browser = _context.sent;
          _context.next = 5;
          return browser.newPage();

        case 5:
          page = _context.sent;
          _context.next = 8;
          return geico({
            page: page,
            email: "amitbharati1234",
            password: "sage!@3A",
            response: {}
          });

        case 8:
          response = _context.sent;
          console.log(response); // browser.close();

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();
var browser;
var app = express();
app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
var carrierExtractorMap = {
  travelers: travelers,
  geico: geico
};
app.get("*", function (req, res) {
  res.json({
    test: "OK"
  });
});
app.post("/extract/data", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, email, password, carrier, response, page;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password, carrier = _req$body.carrier;
            _context2.prev = 1;
            _context2.next = 4;
            return puppeteer.launch();

          case 4:
            browser = _context2.sent;
            _context2.next = 7;
            return browser.newPage();

          case 7:
            page = _context2.sent;
            console.log(carrierExtractorMap, carrier);
            _context2.next = 11;
            return carrierExtractorMap[carrier]({
              page: page,
              email: email,
              password: password,
              res: res
            });

          case 11:
            response = _context2.sent;
            browser.close();
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0); // res.status(500).json({
            //   success: false,
            //   message:
            //     "There was a problem while logging in/extracting data. Please try again."
            // });

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 15]]);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}());
var PORT = 8000;
app.listen(PORT, function () {
  console.log("App successfully started at port ".concat(PORT));
});