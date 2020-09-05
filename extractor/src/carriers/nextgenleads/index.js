const fs = require("fs");

module.exports = async ({ page, email, password, res }) => {
  console.log({
    email,
    password
  });
  let response;
  await page.goto("http://marketplace.nextgenleads.com/login", {waitUntil: 'networkidle2'});
  await page.waitFor(500);
  await page.type("input[name = 'Email Address']", "doug.rowe@joinsage.com");
  await page.waitFor(500);
  await page.type("input[name = 'password']", "e4o1F7BXW$");
  await page.waitFor(1000);
  await page.keyboard.press("\n");
  await page.waitFor(10000);
  await page.goto("http://marketplace.nextgenleads.com/leads/data", {waitUntil: 'networkidle2'});
  await page.on("response", async(data) => {
     await console.log('all the url', data._url);
     await page.waitFor(10000);
    await console.log('this is data', data);
    if (data._url.match('https?://https://api.nextgenleads.com/v3/purchases/query/getByCompanyId')) {
      data.json().then(async d => {
        fs.writeFile(
          "nextgenleads.json",
          JSON.stringify(d._payload.policyInfos),
          "utf8",
          () => {
            console.log("Written");
          }
        );
      });
    }
  });

  return response;
  //   await page.click("#MAIN_NAVIGATION_ID-policies");
  //   const policyInfoSelector = ["div.action-menu > a:nth-child(2)"];
  //   await page.waitForSelector(policyInfoSelector);
  //   await page.click(policyInfoSelector);
  //   await page.waitForSelector(".collapseContainerTitle");
  //   const htmlContent = await page.content();
  //   return await extractDataFromHtml(htmlContent);
};
