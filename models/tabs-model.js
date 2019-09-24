const db = require('../data/db-config.js');

module.exports = {
    insert,
    getTabsByUser,
    getById
}

function getById(id) {
    return db('tabs')
    .select()
    .first()
    .where({ id })
}

function getTabsByUser(username) {
    return db('users as u')
    .join('tabs as t', 'u.id', '=', 't.user_id' )
    .select('t.title', 't.url', 't.category', 't.notes')
    .where({ username })
}


function insert(tab) {
    return db('tabs')
    .insert(tab)
    .then(res => {
        return res;
    })
}