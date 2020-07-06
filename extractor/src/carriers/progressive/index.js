const fs = require("fs");

module.exports = async ({ page, email, password, res }) => {
  console.log({
    email,
    password
  });
  let response;
 // await page.goto("https://account.progressive.com/access/login");
  await page.goto("https://account.progressive.com/access/login",  {waitUntil: 'networkidle2'});
//  await page.waitFor(500);
  await page.type("input[data-pgr-id='inputUserName']", email);
  await page.waitFor(500);
  await page.type("input[data-pgr-id='inputPassword']", password);
  await page.waitFor(500);
  await page.keyboard.press("\n");
  //await page.waitFor(30000);
  //await page.waitForNavigation(); 
  await page.on("response", data => {
    console.log('all the url', data._url);
     page.waitFor(10000);

    if (data._url.includes("/api/v1/account?billingFlag=true")) {
      data.json().then(async d => {
        fs.writeFile(
          "progressive.json",
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
