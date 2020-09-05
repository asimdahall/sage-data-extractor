"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _stringify = _interopRequireDefault(require("@babel/runtime/core-js/json/stringify"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fs = require("fs");

module.exports = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref2) {
    var page, email, password, res, response;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            page = _ref2.page, email = _ref2.email, password = _ref2.password, res = _ref2.res;
            console.log({
              email: email,
              password: password
            });
            _context3.next = 4;
            return page["goto"]("http://marketplace.nextgenleads.com/login", {
              waitUntil: 'networkidle2'
            });

          case 4:
            _context3.next = 6;
            return page.waitFor(500);

          case 6:
            _context3.next = 8;
            return page.type("input[name = 'Email Address']", "doug.rowe@joinsage.com");

          case 8:
            _context3.next = 10;
            return page.waitFor(500);

          case 10:
            _context3.next = 12;
            return page.type("input[name = 'password']", "e4o1F7BXW$");

          case 12:
            _context3.next = 14;
            return page.waitFor(1000);

          case 14:
            _context3.next = 16;
            return page.keyboard.press("\n");

          case 16:
            _context3.next = 18;
            return page.waitFor(10000);

          case 18:
            _context3.next = 20;
            return page["goto"]("http://marketplace.nextgenleads.com/leads/data", {
              waitUntil: 'networkidle2'
            });

          case 20:
            _context3.next = 22;
            return page.on("response", /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return console.log('all the url', data._url);

                      case 2:
                        _context2.next = 4;
                        return page.waitFor(10000);

                      case 4:
                        _context2.next = 6;
                        return console.log('this is data', data);

                      case 6:
                        if (data._url.match('https?://https://api.nextgenleads.com/v3/purchases/query/getByCompanyId')) {
                          data.json().then( /*#__PURE__*/function () {
                            var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(d) {
                              return _regenerator["default"].wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      fs.writeFile("nextgenleads.json", (0, _stringify["default"])(d._payload.policyInfos), "utf8", function () {
                                        console.log("Written");
                                      });

                                    case 1:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee);
                            }));

                            return function (_x3) {
                              return _ref4.apply(this, arguments);
                            };
                          }());
                        }

                      case 7:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x2) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 22:
            return _context3.abrupt("return", response);

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();