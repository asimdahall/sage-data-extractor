const fs = require("fs");
const puppeteer = require("puppeteer-extra");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const travelers = require("./carriers/travellers/index.js");
const geico = require("./carriers/geico/index.js");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  let response = await geico({
    page,
    email: "amitbharati1234",
    password: "sage!@3A",
    response: {}
  });

  console.log(response);
  // browser.close();
})();

let browser;
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const carrierExtractorMap = {
  travelers: travelers,
  geico: geico
};

app.get("*", (req, res) => {
  res.json({
    test: "OK"
  });
});

app.post("/extract/data", async (req, res) => {
  const { email, password, carrier } = req.body;
  let response;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log(carrierExtractorMap, carrier);
    response = await carrierExtractorMap[carrier]({
      page,
      email,
      password,
      res
    });
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
