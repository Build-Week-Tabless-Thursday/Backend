const express = require('express');
const router = express.Router();
const restricted = require('../middleware/restricted-middleware.js');


const Tabs = require('../../models/tabs-model.js');

router.get('/:id', restricted, (req, res) => {
    const { id } = req.params;

    Tabs.getById({ id })
})



module.exports = router;