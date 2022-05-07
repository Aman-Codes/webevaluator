const express = require("express");
const puppeteer = require("puppeteer");
const Cookie = require("../models/cookie");
const {
  urlValidation,
  puppeteerConf,
  handleError,
} = require("../controllers/helper");

const router = express.Router();

const cookieSchema = {
  name: null,
  value: null,
  domain: null,
  path: null,
  expires: null,
  size: null,
  httpOnly: null,
  secure: null,
  session: null,
  sameParty: null,
  sourceScheme: null,
  "source Port": null,
  placed_by: null,
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
          return { ...cookie, ...cookieInfo };
        })
        .catch((err) => console.log("error is", err))
    );
  });
  return Promise.all(promiseList).then((values) => values);
};

router.post("/", async (req, res) => {
  const url = urlValidation(req, res);
  let browser;
  console.log("Url is", url);
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

    Promise.all(PromiseList).then((updatedCookiesInfo) => {
      const result = {
        initialCookies: updatedCookiesInfo[0] || cookieSchema,
        consentDeniedCookies: updatedCookiesInfo[1] || cookieSchema,
        consentAcceptedCookies: updatedCookiesInfo[2] || cookieSchema,
        denyConsent: denyConsent,
        consentAsked: cnstAsked,
      };

      res.send({
        status: "success",
        data: result,
      });
    });
  } catch (error) {
    await handleError(error, res, browser);
  }
});

module.exports = router;
