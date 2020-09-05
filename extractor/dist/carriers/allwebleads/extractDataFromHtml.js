"use strict";

var cheerio = require("cheerio");

var getTextFromElement = function getTextFromElement(element) {
  return element.text().trim().replace(/\s\s+/g, " ").replace(/(\r\n|\n|\r)/gm, "");
};

var getLeadData = function getLeadData($) {
  var leadData = [];
  var $el = $('#leads tbody>tr');
  console.log('I am el', $el);
  console.log('Starting to scrap');
  $el.each(function (i, e) {
    leadData.push({
      leadId: getTextFromElement($(e).find('td>a')),
      leadReceivedDate: getTextFromElement($(e).find('td').eq(1)),
      leadLob: getTextFromElement($(e).find('td').eq(3)),
      leadContactName: getTextFromElement($(e).find('td').eq(4)),
      leadState: getTextFromElement($(e).find('td').eq(5)),
      leadStatus: getTextFromElement($(e).find('td').eq(6))
    });
  });
  console.log('Scrapping end');
  console.log('I am leadData', leadData);
  return leadData;
};

module.exports = function (html) {
  var $ = cheerio.load(html);
  var leadData = getLeadData($); // const final = {
  //   leadId: leadData.id,
  //   leadReceivedDate: leadData.receivedDate,
  //   leadLob: leadData.lob,
  //   leadContactName: leadData.contactName,
  //   leadState: leadData.state,
  //   leadStatus: leadData.status
  // };

  return leadData;
};