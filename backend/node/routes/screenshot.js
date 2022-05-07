const express = require("express");
const puppeteer = require("puppeteer");
const {
  puppeteerConf,
  screenshot,
  urlValidation,
  sendFile,
  openPage,
  handleError,
  randomString,
} = require("../controllers/helper");

const router = express.Router();

router.post("/", async (req, res) => {
  const url = urlValidation(req, res);
  let browser;
  try {
    browser = await puppeteer.launch(puppeteerConf);
    const page = await openPage(browser, url);
    const filePath = `${__dirname}page.png`;
    await screenshot(page, filePath);
    await browser.close();
    sendFile(res, filePath);
  } catch (error) {
    await handleError(error, res, browser);
  }
});

router.post("/lowvision", async (req, res) => {
  const url = urlValidation(req, res);
  let browser;
  try {
    browser = await puppeteer.launch(puppeteerConf);
    const page = await openPage(browser, url);
    await page.evaluate(() => {
      document.body.style.cssText +=
        "-webkit-filter:blur(3px);-moz-filter:blur(3px);-ms-filter:blur(3px);filter:blur(3px);";
    });
    const filePath = `${__dirname}page${randomString(10)}.png`;
    await screenshot(page, filePath);
    await browser.close();
    sendFile(res, filePath);
  } catch (error) {
    await handleError(error, res, browser);
  }
});

router.post("/colorblind", async (req, res) => {
  const url = urlValidation(req, res);
  let browser;
  try {
    browser = await puppeteer.launch(puppeteerConf);
    const page = await openPage(browser, url);
    await page.evaluate(() => {
      document.body.style.cssText +=
        "-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);filter:grayscale(100%);";
    });
    const filePath = `${__dirname}page${randomString(10)}.png`;
    await screenshot(page, filePath);
    await browser.close();
    sendFile(res, filePath);
  } catch (error) {
    await handleError(error, res, browser);
  }
});

module.exports = router;
