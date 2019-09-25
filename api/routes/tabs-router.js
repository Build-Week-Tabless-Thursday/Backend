const express = require("express");

const router = express.Router();
const restricted = require("../middleware/restricted-middleware.js");
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



module.exports = router;
