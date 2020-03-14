"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index = _interopRequireDefault(require("./carriers/travellers/index.js"));

var browser;
var app = (0, _express["default"])();
app.use((0, _morgan["default"])("tiny"));
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
var carrierExtractorMap = {
  travelers: _index["default"]
};
app.post("/extract/data", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, carrier, response, page;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password, carrier = _req$body.carrier;
            _context.prev = 1;
            _context.next = 4;
            return _puppeteer["default"].launch();

          case 4:
            browser = _context.sent;
            _context.next = 7;
            return browser.newPage();

          case 7:
            page = _context.sent;
            _context.next = 10;
            return carrierExtractorMap[carrier]({
              page: page,
              email: email,
              password: password
            });

          case 10:
            response = _context.sent;
            browser.close();
            res.json(response);
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](1);
            res.status(500).json({
              success: false,
              message: "There was a problem while logging in/extracting data. Please try again."
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 15]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var PORT = 8000;
app.listen(PORT, function () {
  console.log("App successfully started at port ".concat(PORT));
});