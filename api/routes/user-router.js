const express = require('express');
const router = express.Router();
const restricted = require('../middleware/restricted-middleware.js');
const bcrypt = require('bcryptjs');

const { validateUser } = require('../middleware/validate-middleware.js');

const Users = require('../../models/users-model.js');

router.get('/', restricted, (req, res) => {
    const { id } = req.user;

    Users.findById(id)
    .then(user => {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    })
    .catch(err => {
        console.log(err);
    })
})


router.put('/', restricted, validateUser, (req, res) => {
    const { id } = req.user;
    const changes = req.body;

    Users.findById(id)
    .then(user => {
        if (user) {
            const hash = bcrypt.hashSync(changes.password, 12);
            Users.update(id, { ...changes, password: hash })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(500)
            })
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    })
    .catch(err => {
        console.log(err);
    })
})

router.delete('/', restricted, (req, res) => {
    const { id } = req.user;

    Users.findById(id)
    .then(user => {
        if (user) {
            Users.remove(id)
            .then(deleted => {
                res.status(200).json(deleted);
            })
            .catch(err => {
                res.status(500)
            })
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    })
    .catch(err => {
        console.log(err);
    })
})


module.exports = router;

