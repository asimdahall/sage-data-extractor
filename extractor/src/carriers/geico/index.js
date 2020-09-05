const fs = require("fs");

module.exports = async ({ page, email, password, res }) => {
  console.log({
    email,
    password
  });
  let response;
  await page.goto("https://www.geico.com/account/");
  await page.waitFor(500);
  await page.type("input[name = userName]", email);
  await page.waitFor(500);
  await page.type("input[name = userPassword]", password);
  await page.waitFor(500);
  await page.keyboard.press("\n");
  await page.on("response", data => {
    console.log('all the url', data._url);
     page.waitFor(10000);

    if (data._url.includes("dashboard/init-home")) {
      data.json().then(async d => {
        fs.writeFile(
          "gieco.json",
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
