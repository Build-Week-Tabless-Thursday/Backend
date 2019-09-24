const express = require("express");
const puppeteer = require('puppeteer');
const router = express.Router();
const restricted = require("../middleware/restricted-middleware.js");
const btoa = require('btoa');
const { validateTab } = require("../middleware/validate-middleware.js");

const Users = require("../../models/users-model.js");
const Tabs = require("../../models/tabs-model.js");

// GET USER TABS
router.get("/", restricted, (req, res) => {
  const { username } = req.user;

  Tabs.getTabsByUser(username)
    .then(tabs => {
      res.status(200).json(tabs);
    })
    .catch(err => {
      res.status(500).json({ error: "Server error" });
    });
});

// ADD A NEW TAB
router.post("/", restricted, validateTab, (req, res) => {
  const tab = req.body;
  const { id } = req.user;

  createScreenshot(tab.url)
  .then(img => {
    tab.user_id = id;
    let preview = img.reduce((data, byte)=> data + String.fromCharCode(byte), '');
    preview = btoa(preview);
    tab.preview = preview;
    

    Tabs.insert(tab)
    .then(tab => {
      res.status(200).json(tab);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    });
  })
  .catch(err => {
    console.log(err)
  })
});


// SCREENSHOT FUNCTION
async function createScreenshot(url) {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ['--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({ width: 600, height: 400 })
  const img = await page.screenshot();
  await browser.close();
  return img;
};

module.exports = router;
