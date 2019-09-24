const db = require('../data/db-config.js');

module.exports = {
    insert,
    findBy,
    findById,
    update,
    remove
}

function insert(user) {
    return db('users')
    .insert(user)
    .then(ids => {
        console.log(ids)
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
    .select('users.id', 'users.username', 'users.email')
    .where({ id })
    .first()
}

function update(id, changes) {
    return db('users')
    .update(changes)
    .where({ id })
    .then(res => {
        return res;
    })
}

function remove(id) {
    return db('users')
    .delete()
    .where({ id })
    .then(res => {
        return res;
    })
}