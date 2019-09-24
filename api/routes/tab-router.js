const express = require('express');
const router = express.Router();
const restricted = require('../middleware/restricted-middleware.js');


const Tabs = require('../../models/tabs-model.js');

router.get('/:id', restricted, (req, res) => {
    const { username } = req.user;
    Tabs.getTabsByUser()
})



module.exports = router;