"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fs = require("fs");

module.exports = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
    var page, email, password, res, response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            page = _ref.page, email = _ref.email, password = _ref.password, res = _ref.res;
            console.log({
              email: email,
              password: password
            });
            _context2.next = 4;
            return page["goto"]("https://www.geico.com/account/");

          case 4:
            _context2.next = 6;
            return page.waitFor(500);

          case 6:
            _context2.next = 8;
            return page.type("input[name = userName]", email);

          case 8:
            _context2.next = 10;
            return page.waitFor(500);

          case 10:
            _context2.next = 12;
            return page.type("input[name = userPassword]", password);

          case 12:
            _context2.next = 14;
            return page.waitFor(500);

          case 14:
            _context2.next = 16;
            return page.keyboard.press("\n");

          case 16:
            _context2.next = 18;
            return page.on("response", function (data) {
              if (data._url.includes("dashboard/init-home")) {
                data.json().then( /*#__PURE__*/function () {
                  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(d) {
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            fs.writeFile("gieco.json", JSON.stringify(d._payload.policyInfos), "utf8", function () {
                              console.log("Written");
                            });

                          case 1:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref3.apply(this, arguments);
                  };
                }());
              }
            });

          case 18:
            return _context2.abrupt("return", response);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();