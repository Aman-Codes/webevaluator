const express = require("express");
const puppeteer = require("puppeteer");
const errorList = require("../data/error");
const warningList = require("../data/warning");
const {
  urlValidation,
  puppeteerConf,
  openPage,
  handleError,
} = require("../controllers/helper");

const router = express.Router();

router.post("/css", async (req, res) => {
  const url = urlValidation(req, res);
  let browser;
  try {
    browser = await puppeteer.launch(puppeteerConf);
    const page = await openPage(browser, url);
    const resultList = await page.evaluate(
      (errorlist, warninglist) => {
        const result = {
          error: [],
          warning: [],
        };
        errorlist.forEach((e) => {
          const elementList = document.querySelectorAll(e.selector);
          if (elementList.length) {
            result.error.push({ ...e, count: elementList.length });
          }
        });
        warninglist.forEach((e) => {
          const elementList = document.querySelectorAll(e.selector);
          if (elementList.length) {
            result.warning.push({ ...e, count: elementList.length });
          }
        });
        return result;
      },
      errorList,
      warningList
    );
    // console.log("resultList is", resultList);
    await browser.close();
    res.send({
      status: "success",
      data: resultList,
    });
  } catch (error) {
    await handleError(error, res, browser);
  }
});

module.exports = router;
