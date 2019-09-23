const express = require('express');
const router = express.Router();

const restricted = require('../middleware/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
    
})



module.exports = router;