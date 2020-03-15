const cheerio = require("cheerio");

const getTextFromElement = element =>
  element
    .text()
    .trim()
    .replace(/\s\s+/g, " ")
    .replace(/(\r\n|\n|\r)/gm, "");

const getBasicInfo = $ => {
  const totalPremium = [
    getTextFromElement($("[data-ui = LabelPremium1]")),
    getTextFromElement($("[data-ui = ValuePremium1]"))
  ];

  const effectiveDate = getTextFromElement($("[data-ui = ValueEff1]")).split(
    "to"
  );

  const billingAccount = getTextFromElement($("[data-ui = LabelBillAcc1]"));
  const mailingAddress = getTextFromElement($("[data-ui = ValueResidence1]"));
  const agency = getTextFromElement($("[data-ui = ValueAgencyLine1]"));
  const policyService = getTextFromElement($("[data-ui = ValueAgencyLine2]"));

  return {
    totalPremium,
    billingAccount,
    mailingAddress,
    effectiveDate,
    agency,
    policyService
  };
};

const getDiscounts = $ => {
  let discounts = [];

  $(".discountRowTitle").each(function(i, e) {
    discounts[i] = $(this).text();
  });

  return discounts;
};

const getDriverDetails = $ => {
  const drivers = [];
  $("[id*='drvr']").each((i, e) => {
    drivers.push({
      name: getTextFromElement($(`[data-ui = SectionDriverName${i + 1}]`, e)),
      relationShip: getTextFromElement(
        $(`[data-ui = SectionDriverRelationship${i + 1}]`, e)
      ),
      lisenseStatus: getTextFromElement(
        $(`[data-ui = SectionDriverLicensed${i + 1}]`, e)
      ),
      personalDetails: getTextFromElement(
        $(`[data-ui = SectionDriverDOB${i + 1}]`, e)
      )
    });
  });
  return drivers;
};

const getCoverages = $ => {
  const coverages = [];

  $("[data-ui*=SectionPolicyCoverage1]> .coverageBlock").each((i, e) =>
    coverages.push({
      name:
        getTextFromElement($("[id*=ValuePolicyCoverageOthersName]", e)) ||
        getTextFromElement($("[id*=ValuePolicyCoverageYouName]", e)),
      limit:
        getTextFromElement(
          $("[data-ui*=ValuePolicyCoverageOthersLimits]", e)
        ) ||
        getTextFromElement($("[data-ui*=ValuePolicyCoverageYouLimits]", e)),
      premium:
        getTextFromElement(
          $("[data-ui*=ValuePolicyCoverageOthersPremium]", e)
        ) ||
        getTextFromElement($("[data-ui*=ValuePolicyCoverageYouPremium]", e))
    })
  );
  return coverages;
};

const getVehicleSpecificCoverages = $ => {
  const vehicleSpecificCoverages = [];
  $(".vehicleCollapse").each((i, e) => {
    vehicleSpecificCoverages.push({
      name: getTextFromElement($("[data-ui*=LabelVehicle]", e)),
      vin: getTextFromElement($("[data-ui*=ValueVehicleVIN1]", e)),
      location: getTextFromElement($("[data-ui*=ValueVehicleGaraging]", e)),
      lienHolderInformationL: getTextFromElement(
        $("[data-ui*=ValueVehicleLienholder]", e)
      ),
      coverages: (function() {
        let vsc = [];
        $(".coverageBlock", e).each((i, e) => {
          vsc.push({
            name: getTextFromElement(
              $("[data-ui*=ValueVehicleCoverageName]", e)
            ),
            limit: getTextFromElement(
              $("[data-ui*=ValueVehicleCoverageLimit]", e)
            ),
            deductible: getTextFromElement(
              $("[data-ui*=ValueVehicleCoverageDeductible]", e)
            ),
            premium: getTextFromElement(
              $("[data-ui*=ValueVehicleCoveragePremium]", e)
            )
          });
        });
        return vsc;
      })()
    });
  });
  return vehicleSpecificCoverages;
};

module.exports = html => {
  const $ = cheerio.load(html);
  const final = {
    basicDetails: getBasicInfo($),
    discounts: getDiscounts($),
    driverDetails: getDriverDetails($),
    coverages: getCoverages($),
    vehicleSpecificCoverages: getVehicleSpecificCoverages($)
  };

  return final;
};
