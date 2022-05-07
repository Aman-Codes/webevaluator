const express = require("express");
const puppeteer = require("puppeteer");
const {
  urlValidation,
  puppeteerConf,
  openPage,
  handleError,
} = require("../controllers/helper");

const router = express.Router();

router.post("/", async (req, res) => {
  const url = urlValidation(req, res);
  let browser;
  try {
    browser = await puppeteer.launch(puppeteerConf);
    const page = await openPage(browser, url);
    const resultList = await page.evaluate(() => {
      const _p = "https://aman-codes.github.io/HTML_CodeSniffer/build/";
      const _i = function (s, cb) {
        return new Promise((resolve) => {
          const sc = document.createElement("script");
          sc.onload = function () {
            sc.onload = null;
            sc.onreadystatechange = null;
            const v = cb.call(this);
            resolve(v);
          };
          sc.onreadystatechange = function () {
            if (/^(complete|loaded)$/.test(this.readyState) === true) {
              sc.onreadystatechange = null;
              sc.onload();
            }
          };
          sc.src = s;
          if (document.head) {
            document.head.appendChild(sc);
          } else {
            document.getElementsByTagName("head")[0].appendChild(sc);
          }
        });
      };
      const options = { path: _p, includeCss: false };
      return _i(`${_p}HTMLCS.js`, function () {
        const WCAG2A = window.HTMLCSAuditor.run(
          "WCAG2A",
          null,
          options,
          window.downloadHTMLCS
        );
        const WCAG2AA = window.HTMLCSAuditor.run(
          "WCAG2AA",
          null,
          options,
          window.downloadHTMLCS
        );
        const WCAG2AAA = window.HTMLCSAuditor.run(
          "WCAG2AAA",
          null,
          options,
          window.downloadHTMLCS
        );
        const Section508 = window.HTMLCSAuditor.run(
          "Section508",
          null,
          options,
          window.downloadHTMLCS
        );
        return { WCAG2A, WCAG2AA, WCAG2AAA, Section508 };
      });
    });
    // console.log("resultList", resultList);
    await browser.close();
    res.send({
      status: "success",
      result: resultList,
    });
  } catch (error) {
    await handleError(error, res, browser);
  }
});

module.exports = router;
