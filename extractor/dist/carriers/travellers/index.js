"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _extractDataFromHtml = _interopRequireDefault(require("./extractDataFromHtml"));

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref2) {
    var page, email, password, policyInfoSelector, htmlContent;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = _ref2.page, email = _ref2.email, password = _ref2.password;
            _context.next = 3;
            return page["goto"]("https://www.travelers.com/login/#/");

          case 3:
            _context.next = 5;
            return page.type("[ng-model = userName]", email);

          case 5:
            _context.next = 7;
            return page.type("[ng-model = password]", password);

          case 7:
            _context.next = 9;
            return page.waitFor(500);

          case 9:
            _context.next = 11;
            return page.click("#btnLogin");

          case 11:
            _context.next = 13;
            return page.waitForNavigation();

          case 13:
            _context.next = 15;
            return page.click("#MAIN_NAVIGATION_ID-policies");

          case 15:
            policyInfoSelector = ["div.action-menu > a:nth-child(2)"];
            _context.next = 18;
            return page.waitForSelector(policyInfoSelector);

          case 18:
            _context.next = 20;
            return page.click(policyInfoSelector);

          case 20:
            _context.next = 22;
            return page.waitForSelector(".collapseContainerTitle");

          case 22:
            _context.next = 24;
            return page.content();

          case 24:
            htmlContent = _context.sent;
            _context.next = 27;
            return (0, _extractDataFromHtml["default"])(htmlContent);

          case 27:
            return _context.abrupt("return", _context.sent);

          case 28:
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

exports["default"] = _default;