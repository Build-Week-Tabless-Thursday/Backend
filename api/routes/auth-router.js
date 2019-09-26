const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secrets = require('../../secrets/secrets.js');
const { validateUser, validateUserLogin } = require('../middleware/validate-middleware.js');
const Users = require('../../models/users-model.js');
const router = express.Router();

// REGISTER A NEW USER
router.post('/register', validateUser, (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 12);

    Users.insert({ username, email, password: hash })
      .then(() =>
        Users.findBy({ username })
          .first()
          .then(user => {
            const token = createToken(user);
            res.status(201).json({ token });
          })
      )
      .catch(err => res.status(400).json({ error: 'Please provide a unique username and email.' }));
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// USER LOGIN
router.post('/login', validateUserLogin, (req, res) => {
  try {
    const { username, password } = req.body;

    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = createToken(user);
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'Server error' });
      });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// CREATE TOKEN
function createToken(user) {
  if (!user.id || !user.username || !user.email)
    throw new Error('Error while creating token: Invalid User');
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secrets.JWT_SECRET, options);
}

module.exports = router;
