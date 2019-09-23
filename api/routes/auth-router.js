const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secrets = require('../../secrets/secrets.js');
const { validateUser, validateUserLogin } = require('../middleware/validate-middleware.js');
const Users = require('../../models/users-model.js');
const router = express.Router();


router.post('/register', validateUser, (req, res) => {
    const { username, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 12);

    Users.insert({ username, email, password: hash })
    .then(user => {
        const token = createToken(user);
        res.status(201).json({ token });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'Server error' });
      })
});


router.post('/login', validateUserLogin, (req, res) => {
    const { username, password } = req.body;
  
    Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = createToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' })
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Server error' })
    })
  
  });


  // CREATE TOKEN
  function createToken(user) {
    const payload = {
        username: user.username,
        email: user.email
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.JWT_SECRET, options);
}



module.exports = router;