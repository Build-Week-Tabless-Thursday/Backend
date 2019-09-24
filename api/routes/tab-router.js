const express = require("express");
const router = express.Router();
const restricted = require("../middleware/restricted-middleware.js");
const { validateTab } = require("../middleware/validate-middleware.js");

const Tabs = require("../../models/tabs-model.js");

router.get("/:id", restricted, (req, res) => {
  const { username } = req.user;
  const { id } = req.params;

  Tabs.getTabsByUser(username)
    .then(tabs => {
      const tab = tabs.find(tab => parseInt(id) === tab.id);
      if (tab) {
        res.status(200).json(tab);
      } else {
        res.status(404).json({ message: "Tab not found" });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.put("/:id", restricted, validateTab, (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  const { username } = req.user;

  Tabs.getTabsByUser(username).then(tabs => {
    findTab(id, tabs, res, (id) => {
      Tabs.update(id, changes)
        .then(updated => {
          res.status(200).json(updated);
        })
        .catch(err => {
            res.status(500).json({ error: 'Server error' });
        });
    });
  });
});

router.delete("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const { username } = req.user;

  Tabs.getTabsByUser(username).then(tabs => {
    findTab(id, tabs, res, (id) => {
        Tabs.remove(id)
        .then(deleted => {
          res.status(200).json(deleted);
        })
        .catch(err => {
            res.status(500).json({ error: 'Server error' });
        });
      });
  });
});

function findTab(id, tabs, res, cb) {
  const tab = tabs.find(tab => parseInt(id) === tab.id);
  if (tab) {
    cb(tab.id);
  } else {
    res.status(404).json({ message: "Tab not found" });
  }
}

module.exports = router;
