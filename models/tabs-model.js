const db = require("../data/db-config.js");

module.exports = {
  insert,
  getTabsByUser,
  getById,
  update,
  remove
};

function getById(id) {
  return db("tabs")
    .select()
    .first()
    .where("id", id);
}

function getTabsByUser(username) {
  return db("users as u")
    .join("tabs as t", "u.id", "=", "t.user_id")
    .select("t.id", "t.title", "t.url", "t.preview", "t.category", "t.notes")
    .where({ username });
}

function insert(tab) {
  return db("tabs")
    .insert(tab)
    .then(res => {
      return res;
    });
}

function update(id, changes) {
  return db("tabs")
    .update(changes)
    .where({ id })
    .then(res => {
      return res;
    });
}

function remove(id) {
  return db("tabs")
    .delete()
    .where({ id })
    .then(res => {
      return res;
    });
}
