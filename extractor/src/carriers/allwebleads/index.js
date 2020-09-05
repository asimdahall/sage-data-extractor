const fs = require("fs");
const extractDataFromHtml = require("./extractDataFromHtml.js");

module.exports = async ({ page, email, password, res }) => {
  console.log({
    email,
    password
  });
  let response;
  await page.goto("https://secure.allwebleads.com/login", {waitUntil: 'networkidle2'});
  await page.waitFor(500);
  await page.type("input[id='Username']", "rashik.adhikari@coveredbysage.com");
  await page.waitFor(500);
  await page.type("input[id='Password']", "Tinyhome1!");
  await page.waitFor(1000);
  await page.keyboard.press("\n");
  await page.waitForNavigation();
  await page.goto("https://secure.allwebleads.com/leads/?mode=Leads&SearchQuery=&PageNumberLeads=1&PageNumberCalls=1&RecordsPerPageCalls=25&TimeLimitCustomStartDate=&LeadAssignmentStatuses=New&LeadAssignmentStatuses=Open&LeadTypes=Health&LeadTypes=Auto&LeadTypes=Home&LeadTypes=Life&LeadTypes=LTC&LeadTypes=Annuity&LeadTypes=Renters&LeadTypes=Disability&LeadTypes=Business&LeadTypes=BusinessBenefits&LeadTypes=BusinessPC&TimeLimit=SevenDays&RecordsPerPageLeads=50");
  //await page.waitForNavigation();
  await page.waitFor(1000);
  const leadsTableSelector = "div#leads-table";
  await page.waitForSelector(leadsTableSelector);
  //await page.click(policyInfoSelector);
  //await page.waitForSelector(".collapseContainerTitle");
  const htmlContent = await page.content();
  const extractedLeadData = await extractDataFromHtml(htmlContent);
  fs.writeFile(
    "allweblead.json",
    JSON.stringify(extractedLeadData),
    "utf8",
    () => {
      console.log("Written");
    }
  );
  return await extractedLeadData;
};
