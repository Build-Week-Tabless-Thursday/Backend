const db = require('../data/db-config.js');

module.exports = {
    insert,
    findBy
}

function insert(user) {
    return db('users')
    .insert(user)
    .then(res => {
        return res;
    })
}

function findBy(filter) {
    return db('users')
    .where(filter)
    .first()
}