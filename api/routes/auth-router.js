require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const router = express.Router();


router.post('/register', validateUser, (req, res) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 12);

    
})


router.post('/login', (req, res) => {
    
})


// MIDDLEWARE

function validateUser(req, res, next) {
    const { username, email, password } = req.body;

    if (username && email && password) {
        next();
    } else {
        res.status(400).json({ message: 'Please provide a username, email, and password.' })
    }
}

module.exports = router;