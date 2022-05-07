const puppeteer = require("puppeteer");
const errorList = require("../data/error");
const warningList = require("../data/warning");
const Cookie = require("../models/cookie");
const path = require("path");
const axios = require("axios");
const {
  puppeteerConf,
  openPage,
  handleSubError,
  screenshot,
  randomString,
} = require("./helper");

const adaErrors = async (url) => {
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
    return resultList;
  } catch (error) {
    await handleSubError(error, browser);
    return null;
  }
};

const fetchCookieInfo = (cookieName) => {
  return new Promise((resolve, reject) => {
    Cookie.findOne({ cookie_name: cookieName }).exec((err, c) => {
      if (err) {
        console.log("Error occured in finding cookie", err);
        reject(err);
      } else {
        const output = {
          placed_by: null,
          functionality: null,
          purpose: null,
        };

        if (c !== null) {
          output.placed_by = c.placed_by;
          output.functionality = c.functionality;
          output.purpose = c.purpose;
        }

        resolve(output);
      }
    });
  });
};

const fetchCookiesInfo = async (cookiesList) => {
  const promiseList = [];
  await cookiesList.forEach((cookie) => {
    promiseList.push(
      fetchCookieInfo(cookie.name)
        .then((cookieInfo) => {
          return { ...cookie, info: cookieInfo };
        })
        .catch((err) => console.log("error is", err))
    );
  });
  return Promise.all(promiseList).then((values) => values);
};

const cookieChecker = async (url) => {
  let browser;
  // console.log("Url is", url);
  try {
    browser = await puppeteer.launch(puppeteerConf);

    const page = await browser.newPage(); // to store cookies
    const waitUntil = ["load", "domcontentloaded"];
    // if user can deny consent, open a new incognito page, deny the consent and check for cookies
    await page.goto(url, { waitUntil: waitUntil });

    const triggerAccept = ["Accept all", "Manage Cookies"]; // more can be added
    const triggerDeny = ["Deny", "Deny all"];

    let aCookies, dCookies;
    await page.waitForTimeout(2 * 1000); // some cookies load lately
    const iCookies = await page.cookies();

    //   check if cookie consent is being asked, also, can if we can deny

    const [cnstAsked, denyConsent] = await page.evaluate(
      (triggerAccept, triggerDeny) => {
        let cnstAsked = false;
        let denyConsent = false; // consent can be denied

        const allBtns = document.querySelectorAll("button");

        allBtns.forEach((btn) => {
          // accept the cookies if consent is not accepted yet

          if (!cnstAsked) {
            for (let i = 0; i < triggerAccept.length; i++) {
              if (btn.innerHTML.includes(triggerAccept[i])) {
                cnstAsked = true;
                btn.click(); // consent accepted
                break; // dont loop through other options
                // check for validity: maybe wrong btn pressed
              }
            }
          }

          // check if user can deny
          if (!denyConsent) {
            for (let i = 0; i < triggerDeny.length; i++) {
              if (btn.innerHTML.includes(triggerDeny[i])) {
                denyConsent = true;
                break; // dont loop through other options
                // check for validity: maybe wrong btn pressed
              }
            }
          }
        });

        return [cnstAsked, denyConsent];
      },
      triggerAccept,
      triggerDeny
    );

    if (cnstAsked) {
      // check further
      await page.reload(); // reload page
      await page.waitForTimeout(2 * 1000); // some cookies load lately
      aCookies = await page.cookies(); // additional cookies after consent accepted
      dCookies = null;

      if (denyConsent) {
        // delete all the cookies, then reload the page
        const client = await page.target().createCDPSession();
        await client.send("Network.clearBrowserCookies");
        await page.reload();

        await page.evaluate((triggerDeny) => {
          let clicked = false;
          const allBtns = document.querySelectorAll("button");

          allBtns.forEach((btn) => {
            // accept the cookies if consent is not accepted yet
            if (!clicked) {
              for (let i = 0; i < triggerDeny.length; i++) {
                if (btn.innerHTML.includes(triggerDeny[i])) {
                  btn.click(); // consent accepted
                  clicked = true;
                  break; // dont loop through other options
                  // check for validity: maybe wrong btn pressed
                }
              }
            }
          });
        }, triggerDeny);

        await page.reload();
        await page.waitForTimeout(2 * 1000); // some cookies load lately
        dCookies = await page.cookies(); // cookies present when consent denied
      }
    } else {
      // since consent hasn't been asked, all the cookies would be same as the initial ones
      aCookies = null;
      dCookies = null;
    }

    await browser?.close();
    const PromiseList = [
      iCookies ? fetchCookiesInfo(iCookies) : null,
      dCookies ? fetchCookiesInfo(dCookies) : null,
      aCookies ? fetchCookiesInfo(aCookies) : null,
    ];

    return Promise.all(PromiseList).then((updatedCookiesInfo) => {
      const result = {
        initialCookies: updatedCookiesInfo[0],
        consentDeniedCookies: updatedCookiesInfo[1],
        consentAcceptedCookies: updatedCookiesInfo[2],
        denyConsent: denyConsent,
        consentAsked: cnstAsked,
      };
      return result;
    });
  } catch (error) {
    await handleSubError(error, browser);
    return null;
  }
};

const sniffer = async (url) => {
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
    return resultList;
  } catch (error) {
    await handleSubError(error, browser);
    return null;
  }
};

const lowvision = async (url) => {
  let browser;
  try {
    browser = await puppeteer.launch(puppeteerConf);
    const page = await openPage(browser, url);
    await page.evaluate(() => {
      document.body.style.cssText +=
        "-webkit-filter:blur(3px);-moz-filter:blur(3px);-ms-filter:blur(3px);filter:blur(3px);";
    });
    const fileName = `page${randomString(10)}.png`;
    const filePath = path.resolve(__dirname, "..", "public", fileName);
    await screenshot(page, filePath);
    await browser.close();
    return fileName;
  } catch (error) {
    await handleSubError(error, browser);
    return null;
  }
};

const colorblind = async (url) => {
  let browser;
  try {
    browser = await puppeteer.launch(puppeteerConf);
    const page = await openPage(browser, url);
    await page.evaluate(() => {
      document.body.style.cssText +=
        "-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);filter:grayscale(100%);";
    });
    const fileName = `page${randomString(10)}.png`;
    const filePath = path.resolve(__dirname, "..", "public", fileName);
    await screenshot(page, filePath);
    await browser.close();
    return fileName;
  } catch (error) {
    await handleSubError(error, browser);
    return null;
  }
};

const ssl = async (url) => {
  return axios({
    method: "post",
    url: "http://localhost:8080/ssl",
    data: {
      URL: url,
    },
  })
    .then((response) => {
      // console.log("data is ", response.data);
      return response?.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

const securityHeader = async (url) => {
  return axios({
    method: "post",
    url: "http://localhost:8000/securityheader",
    data: {
      URL: url,
    },
  })
    .then((response) => {
      // console.log("data is ", response.data);
      return response?.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

const sslapi = async (url) => {
  return axios({
    method: "post",
    url: "http://localhost:8000/ssl",
    data: {
      URL: url,
    },
  })
    .then((response) => {
      // console.log("data is ", response.data);
      return response?.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

module.exports = {
  adaErrors,
  cookieChecker,
  sniffer,
  lowvision,
  colorblind,
  ssl,
  securityHeader,
  sslapi,
};
