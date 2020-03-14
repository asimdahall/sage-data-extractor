import extractDataFromHtml from "./extractDataFromHtml";

export default async ({ page, email, password }) => {
  await page.goto("https://www.travelers.com/login/#/");
  await page.type("[ng-model = userName]", email);
  await page.type("[ng-model = password]", password);
  await page.waitFor(500);
  await page.click("#btnLogin");
  await page.waitForNavigation();
  await page.click("#MAIN_NAVIGATION_ID-policies");
  const policyInfoSelector = ["div.action-menu > a:nth-child(2)"];
  await page.waitForSelector(policyInfoSelector);
  await page.click(policyInfoSelector);
  await page.waitForSelector(".collapseContainerTitle");
  const htmlContent = await page.content();
  return await extractDataFromHtml(htmlContent);
};
