const db = require('../data/db-config.js');

module.exports = {
    insert,
    findBy,
    findById
}

function insert(user) {
    return db('users')
    .insert(user)
    .then(ids => {
        const [id] = ids;
        return id;
    })
}

function findBy(filter) {
    return db('users')
    .where(filter)
    .first()
}

function findById(id) {
    return db('users')
    .where({ id })
    .first()
}