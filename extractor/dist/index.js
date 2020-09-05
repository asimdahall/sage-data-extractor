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

var progressive = require("./carriers/progressive/index.js");

var nextGenLeads = require("./carriers/nextgenleads/index.js");

var allWebLeads = require("./carriers/allwebleads/index.js");

var StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin()); // (async () => {
//   browser = await puppeteer.launch({
//     headless: false
//   });
//   const page = await browser.newPage();
//   // let response = await geico({
//   //   page,
//   //   email: "amitbharati1234",
//   //   password: "phuchu!@3A",
//   //   response: {}
//   // });
//  // console.log(response);
//   // browser.close();
// })();

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
  geico: geico,
  progressive: progressive,
  nextgenleads: nextGenLeads,
  allwebleads: allWebLeads
};
console.log('this is carrierextract map', carrierExtractorMap);
app.get("*", function (req, res) {
  //console.log(req);
  //console.log(res);
  res.json({
    test: "OK"
  });
});
app.post("/extract/data", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, carrier, response, page;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //console.log('this is body', req.body);
            _req$body = req.body, email = _req$body.email, password = _req$body.password, carrier = _req$body.carrier;
            _context.prev = 1;
            console.log('browser launching');
            console.log('browser', browser);
            _context.next = 6;
            return puppeteer.launch({
              headless: false
            });

          case 6:
            browser = _context.sent;
            _context.next = 9;
            return browser.newPage();

          case 9:
            page = _context.sent;
            _context.next = 12;
            return carrierExtractorMap[carrier]({
              page: page,
              email: email,
              password: password,
              res: res
            });

          case 12:
            response = _context.sent;
            _context.next = 15;
            return console.log('reponse received.');

          case 15:
            _context.next = 17;
            return browser.close();

          case 17:
            res.json(response);
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.status(500).json({
              success: false,
              message: "There was a problem while logging in/extracting data. Please try again."
            });

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 20]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var PORT = 8000;
app.listen(PORT, function () {
  console.log("App successfully started at port ".concat(PORT));
});