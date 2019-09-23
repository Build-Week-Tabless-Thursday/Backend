const express = require('express');
const router = express.Router();

const restricted = require('../middleware/restricted-middleware.js');


router.get('/', restricted, (req, res) => {
    const { id } = req.query;


})



module.exports = router;