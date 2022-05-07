const fs = require("fs");

const puppeteerConf = {
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  timeout: 100000,
};

const autoScroll = async (page) => {
  await page?.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 200;
      const timer = setInterval(() => {
        const { scrollHeight } = document.body;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 300);
    });
  });
};

const screenshot = async (page, filePath) => {
  await autoScroll(page);
  await page?.screenshot({
    path: filePath,
    fullPage: true,
  });
};

const urlValidation = (req, res) => {
  const { url } = req.body;
  console.log("Url is", url);
  if (!url) {
    res.send({
      status: "error",
      message: "missing input url",
    });
  } else {
    return url;
  }
};

const sendFile = (res, filePath) => {
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    fs.unlink(filePath, function (error) {
      if (error) {
        console.log(error);
        res.send(error);
      }
    });
  });
};

const openPage = async (browser, url) => {
  const page = await browser?.newPage();
  await page?.setViewport({ width: 1200, height: 800 });
  await page?.goto(url, {
    waitUntil: "networkidle0",
  });
  return page;
};

const handleError = async (error, res, browser) => {
  await browser?.close();
  console.log("error is", error);
  res.send({
    status: "error",
    message: error.message || "Internal Server Error",
  });
};

const handleSubError = async (error, browser) => {
  await browser?.close();
  console.log("error is", error);
};

const randomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = {
  puppeteerConf,
  autoScroll,
  screenshot,
  urlValidation,
  sendFile,
  openPage,
  handleError,
  handleSubError,
  randomString,
};
