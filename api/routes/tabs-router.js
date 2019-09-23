const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('TESTING HEROKU');
})


router.get('/:id', (req, res) => {

})



module.exports = router;