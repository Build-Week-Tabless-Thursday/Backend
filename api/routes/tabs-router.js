const express = require("express");
const router = express.Router();
const restricted = require("../middleware/restricted-middleware.js");

const { validateTab } = require("../middleware/validate-middleware.js");

const Users = require("../../models/users-model.js");
const Tabs = require("../../models/tabs-model.js");

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

router.post("/", restricted, validateTab, (req, res) => {
  const tab = req.body;
  const { username } = req.user;

  Users.findBy({ username }).then(user => {
    if (user) {
      Tabs.insert({ ...tab, user_id: user.id })
        .then(tab => {
          res.status(200).json(tab);
        })
        .catch(err => {
          res.status(500).json({ error: "Server error" });
        });
    } else {
      res.status(404).json({ error: "User not found." });
    }
  });
});

module.exports = router;
