import fs from "fs";
import puppeteer from "puppeteer";
import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import travelers from "./carriers/travellers/index.js";

let browser;
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const carrierExtractorMap = {
  travelers: travelers
};

app.post("/extract/data", async (req, res) => {
  const { email, password, carrier } = req.body;
  let response;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    response = await carrierExtractorMap[carrier]({ page, email, password });
    browser.close();
    res.json(response);
  } catch (e) {
    res.status(500).json({
      success: false,
      message:
        "There was a problem while logging in/extracting data. Please try again."
    });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App successfully started at port ${PORT}`);
});
