const db = require('../data/db-config.js');

module.exports = {
    insert
}

function insert(user) {
    return db('users')
    .insert(user)
    .then(res => {
        return res;
    })
}