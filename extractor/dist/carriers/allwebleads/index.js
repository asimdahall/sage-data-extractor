"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _stringify = _interopRequireDefault(require("@babel/runtime/core-js/json/stringify"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fs = require("fs");

var extractDataFromHtml = require("./extractDataFromHtml.js");

module.exports = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref2) {
    var page, email, password, res, response, leadsTableSelector, htmlContent, extractedLeadData;
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
            return page["goto"]("https://secure.allwebleads.com/login", {
              waitUntil: 'networkidle2'
            });

          case 4:
            _context.next = 6;
            return page.waitFor(500);

          case 6:
            _context.next = 8;
            return page.type("input[id='Username']", "rashik.adhikari@coveredbysage.com");

          case 8:
            _context.next = 10;
            return page.waitFor(500);

          case 10:
            _context.next = 12;
            return page.type("input[id='Password']", "Tinyhome1!");

          case 12:
            _context.next = 14;
            return page.waitFor(1000);

          case 14:
            _context.next = 16;
            return page.keyboard.press("\n");

          case 16:
            _context.next = 18;
            return page.waitForNavigation();

          case 18:
            _context.next = 20;
            return page["goto"]("https://secure.allwebleads.com/leads/?mode=Leads&SearchQuery=&PageNumberLeads=1&PageNumberCalls=1&RecordsPerPageCalls=25&TimeLimitCustomStartDate=&LeadAssignmentStatuses=New&LeadAssignmentStatuses=Open&LeadTypes=Health&LeadTypes=Auto&LeadTypes=Home&LeadTypes=Life&LeadTypes=LTC&LeadTypes=Annuity&LeadTypes=Renters&LeadTypes=Disability&LeadTypes=Business&LeadTypes=BusinessBenefits&LeadTypes=BusinessPC&TimeLimit=SevenDays&RecordsPerPageLeads=50");

          case 20:
            _context.next = 22;
            return page.waitFor(1000);

          case 22:
            leadsTableSelector = "div#leads-table";
            _context.next = 25;
            return page.waitForSelector(leadsTableSelector);

          case 25:
            _context.next = 27;
            return page.content();

          case 27:
            htmlContent = _context.sent;
            _context.next = 30;
            return extractDataFromHtml(htmlContent);

          case 30:
            extractedLeadData = _context.sent;
            fs.writeFile("allweblead.json", (0, _stringify["default"])(extractedLeadData), "utf8", function () {
              console.log("Written");
            });
            _context.next = 34;
            return extractedLeadData;

          case 34:
            return _context.abrupt("return", _context.sent);

          case 35:
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