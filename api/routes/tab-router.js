const express = require('express');
const router = express.Router();

const btoa = require('btoa');
const prerendercloud = require('prerendercloud');
const Vibrant = require('node-vibrant');

const restricted = require('../middleware/restricted-middleware.js');
const { validateTab } = require('../middleware/validate-middleware.js');
const Tabs = require('../../models/tabs-model.js');

prerendercloud.set('prerenderToken', process.env.SCREENSHOT_TOKEN);

// ADD A NEW TAB
router.post('/', restricted, validateTab, (req, res) => {
  const tab = req.body;
  const { id, username } = req.user;

  createScreenshot(tab.url)
    .then(async ({ string, buffer }) => {
      tab.preview = string;
      const { backgroundColor, color } = await createColors(buffer);
      tab.backgroundColor = backgroundColor;
      tab.color = color;
    })
    .catch(err => {
      console.log(err);
      tab.preview = null;
      tab.backgroundColor = null;
      tab.color = null;
    })
    .finally(() => {
      tab.user_id = id;
      Tabs.insert(tab)
        .then(ids => {
          res.status(201).json({ id: ids[0], ...tab });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: 'Server error' });
        });
    });
});

router.get('/:id', restricted, (req, res) => {
  const { username } = req.user;
  const { id } = req.params;

  Tabs.getTabsByUser(username)
    .then(tabs => {
      const tab = tabs.find(tab => parseInt(id) === tab.id);
      if (tab) {
        res.status(200).json(tab);
      } else {
        res.status(404).json({ message: 'Tab not found' });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.put('/:id', restricted, validateTab, (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  const { username } = req.user;

  createScreenshot(changes.url)
    .then(async ({ string, buffer }) => {
      changes.preview = string;
      const { backgroundColor, color } = await createColors(buffer);
      changes.backgroundColor = backgroundColor;
      changes.color = color;
    })
    .catch(err => {
      console.log(err);
      changes.preview = null;
      changes.backgroundColor = null;
      changes.color = null;
    })
    .finally(() => {
      Tabs.getTabsByUser(username).then(tabs => {
        findTab(id, tabs, res, id => {
          Tabs.update(id, changes)
            .then(id => {
              res.status(200).json({ id, ...changes });
            })
            .catch(err => {
              res.status(500).json({ error: 'Server error' });
            });
        });
      });
    });
});

router.delete('/:id', restricted, (req, res) => {
  const { id } = req.params;
  const { username } = req.user;

  Tabs.getTabsByUser(username).then(tabs => {
    findTab(id, tabs, res, id => {
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

// SCREENSHOT FUNCTION
async function createScreenshot(url) {
  const img = await prerendercloud.screenshot(url, {
    deviceWidth: 800,
    deviceHeight: 600,
    viewportWidth: 640,
    viewportHeight: 480,
  });
  const string = img.reduce((data, byte) => data + String.fromCharCode(byte), '');

  return { string: `data:image/jpg;base64, ${btoa(string)}`, buffer: img };
}

async function createColors(img) {
  const vibrant = Vibrant.from(img);
  let colors = { backgroundColor: null, color: null };

  await vibrant.getPalette((_, palette) => {
    colors = {
      backgroundColor: palette['Vibrant'].getHex(),
      color: palette['DarkMuted'].getBodyTextColor(),
    };
  });

  return colors;
}

function findTab(id, tabs, res, cb) {
  const tab = tabs.find(tab => parseInt(id) === tab.id);
  if (tab) {
    cb(tab.id);
  } else {
    res.status(404).json({ message: 'Tab not found' });
  }
}

module.exports = router;
