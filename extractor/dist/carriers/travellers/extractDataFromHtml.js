"use strict";

var cheerio = require("cheerio");

var getTextFromElement = function getTextFromElement(element) {
  return element.text().trim().replace(/\s\s+/g, " ").replace(/(\r\n|\n|\r)/gm, "");
};

var getBasicInfo = function getBasicInfo($) {
  var totalPremium = [getTextFromElement($("[data-ui = LabelPremium1]")), getTextFromElement($("[data-ui = ValuePremium1]"))];
  var effectiveDate = getTextFromElement($("[data-ui = ValueEff1]")).split("to");
  var billingAccount = getTextFromElement($("[data-ui = LabelBillAcc1]"));
  var mailingAddress = getTextFromElement($("[data-ui = ValueResidence1]"));
  var agency = getTextFromElement($("[data-ui = ValueAgencyLine1]"));
  var policyService = getTextFromElement($("[data-ui = ValueAgencyLine2]"));
  return {
    totalPremium: totalPremium,
    billingAccount: billingAccount,
    mailingAddress: mailingAddress,
    effectiveDate: effectiveDate,
    agency: agency,
    policyService: policyService
  };
};

var getDiscounts = function getDiscounts($) {
  var discounts = [];
  $(".discountRowTitle").each(function (i, e) {
    discounts[i] = $(this).text();
  });
  return discounts;
};

var getDriverDetails = function getDriverDetails($) {
  var drivers = [];
  $("[id*='drvr']").each(function (i, e) {
    drivers.push({
      name: getTextFromElement($("[data-ui = SectionDriverName".concat(i + 1, "]"), e)),
      relationShip: getTextFromElement($("[data-ui = SectionDriverRelationship".concat(i + 1, "]"), e)),
      lisenseStatus: getTextFromElement($("[data-ui = SectionDriverLicensed".concat(i + 1, "]"), e)),
      personalDetails: getTextFromElement($("[data-ui = SectionDriverDOB".concat(i + 1, "]"), e))
    });
  });
  return drivers;
};

var getCoverages = function getCoverages($) {
  var coverages = [];
  $("[data-ui*=SectionPolicyCoverage1]> .coverageBlock").each(function (i, e) {
    return coverages.push({
      name: getTextFromElement($("[id*=ValuePolicyCoverageOthersName]", e)) || getTextFromElement($("[id*=ValuePolicyCoverageYouName]", e)),
      limit: getTextFromElement($("[data-ui*=ValuePolicyCoverageOthersLimits]", e)) || getTextFromElement($("[data-ui*=ValuePolicyCoverageYouLimits]", e)),
      premium: getTextFromElement($("[data-ui*=ValuePolicyCoverageOthersPremium]", e)) || getTextFromElement($("[data-ui*=ValuePolicyCoverageYouPremium]", e))
    });
  });
  return coverages;
};

var getVehicleSpecificCoverages = function getVehicleSpecificCoverages($) {
  var vehicleSpecificCoverages = [];
  $(".vehicleCollapse").each(function (i, e) {
    vehicleSpecificCoverages.push({
      name: getTextFromElement($("[data-ui*=LabelVehicle]", e)),
      vin: getTextFromElement($("[data-ui*=ValueVehicleVIN1]", e)),
      location: getTextFromElement($("[data-ui*=ValueVehicleGaraging]", e)),
      lienHolderInformationL: getTextFromElement($("[data-ui*=ValueVehicleLienholder]", e)),
      coverages: function () {
        var vsc = [];
        $(".coverageBlock", e).each(function (i, e) {
          vsc.push({
            name: getTextFromElement($("[data-ui*=ValueVehicleCoverageName]", e)),
            limit: getTextFromElement($("[data-ui*=ValueVehicleCoverageLimit]", e)),
            deductible: getTextFromElement($("[data-ui*=ValueVehicleCoverageDeductible]", e)),
            premium: getTextFromElement($("[data-ui*=ValueVehicleCoveragePremium]", e))
          });
        });
        return vsc;
      }()
    });
  });
  return vehicleSpecificCoverages;
};

module.exports = function (html) {
  var $ = cheerio.load(html);
  var _final = {
    basicDetails: getBasicInfo($),
    discounts: getDiscounts($),
    driverDetails: getDriverDetails($),
    coverages: getCoverages($),
    vehicleSpecificCoverages: getVehicleSpecificCoverages($)
  };
  return _final;
};