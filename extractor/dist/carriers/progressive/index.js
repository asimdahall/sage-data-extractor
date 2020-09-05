"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _stringify = _interopRequireDefault(require("@babel/runtime/core-js/json/stringify"));

var _promise = _interopRequireDefault(require("@babel/runtime/core-js/promise"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fs = require("fs");

module.exports = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref2) {
    var page, email, password, res, response, waitForResponse, url;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = _ref2.page, email = _ref2.email, password = _ref2.password, res = _ref2.res;
            console.log({
              email: email,
              password: password
            });
            _context.next = 4;
            return page["goto"]("https://account.progressive.com/access/login", {
              waitUntil: 'networkidle2'
            });

          case 4:
            _context.next = 6;
            return page.type("input[data-pgr-id='inputUserName']", email);

          case 6:
            _context.next = 8;
            return page.waitFor(500);

          case 8:
            _context.next = 10;
            return page.type("input[data-pgr-id='inputPassword']", password);

          case 10:
            _context.next = 12;
            return page.waitFor(500);

          case 12:
            _context.next = 14;
            return page.keyboard.press("\n");

          case 14:
            //await page.waitFor(30000);
            //await page.waitForNavigation(); 
            waitForResponse = function waitForResponse(page, url) {
              return new _promise["default"](function (resolve, reject) {
                page.on("response", function (data) {
                  console.log('all the url', data._url); //page.waitFor(10000);

                  if (data._url.includes(url)) {
                    console.log('I found the URLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL********************', data._url);
                    data.json().then(function (d) {
                      fs.writeFile("progressive.json", (0, _stringify["default"])(d), "utf8", function () {
                        resolve(console.log("Written"));
                      });
                    });
                  } else {
                    reject('Account Billing URL not found');
                  }
                });
              });
            };

            url = "/api/v1/account";
            _context.next = 18;
            return waitForResponse(page, url).then(function (response) {
              return response;
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();