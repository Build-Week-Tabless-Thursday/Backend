const db = require('../data/db-config.js');

module.exports = {
  insert,
  getTabsByUser,
  update,
  remove,
};

function getTabsByUser(username) {
  return db('users as u')
    .join('tabs as t', 'u.id', '=', 't.user_id')
    .select(
      't.id',
      't.title',
      't.url',
      't.category',
      't.due',
      't.notes',
      't.preview',
      't.color',
      't.backgroundColor'
    )
    .where({ username });
}

function insert(tab) {
  return db('tabs')
    .insert(tab)
    .returning('*');
}

function update(id, changes) {
  return db('tabs')
    .update(changes)
    .where({ id })
    .then(res => {
      return res;
    });
}

function remove(id) {
  return db('tabs')
    .delete()
    .where({ id })
    .then(res => {
      return res;
    });
}
