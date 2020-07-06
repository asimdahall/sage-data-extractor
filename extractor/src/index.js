const fs = require("fs");
const puppeteer = require("puppeteer-extra");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const travelers = require("./carriers/travellers/index.js");
const geico = require("./carriers/geico/index.js");
const progressive = require("./carriers/progressive/index.js");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

// (async () => {
//   browser = await puppeteer.launch({
//     headless: false
//   });
//   const page = await browser.newPage();
//   // let response = await geico({
//   //   page,
//   //   email: "amitbharati1234",
//   //   password: "phuchu!@3A",
//   //   response: {}
//   // });

//  // console.log(response);
//   // browser.close();
// })();

let browser;
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const carrierExtractorMap = {
  travelers: travelers,
  geico: geico,
  progressive: progressive
};
console.log('this is carrierextract map', carrierExtractorMap);
app.get("*", (req, res) => {
  //console.log(req);
  //console.log(res);
  res.json({
    test: "OK"
  });
});

app.post("/extract/data", async (req, res) => {
  //console.log('this is body', req.body);
  const { email, password, carrier } = req.body;
  let response;
  try {
    console.log('browser launching');
    console.log('browser', browser);
    browser = await puppeteer.launch({
           headless: false
    });
    //browser = await puppeteer.launch();
    const page = await browser.newPage();
    //console.log(carrierExtractorMap, carrier);
    response = await carrierExtractorMap[carrier]({
      page,
      email,
      password,
      res
    });
    console.log('reponse received.');
    page.waitFor(30000);
    browser.close();
  } catch (e) {
    console.log(e);
    // res.status(500).json({
    //   success: false,
    //   message:
    //     "There was a problem while logging in/extracting data. Please try again."
    // });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App successfully started at port ${PORT}`);
});
