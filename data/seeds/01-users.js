const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'User 1', email: 'user1@email.com', password: `${bcrypt.hashSync('pass1', 12)}`},
        {username: 'User 2', email: 'user2@email.com', password: `${bcrypt.hashSync('pass2', 12)}`},
        {username: 'User 3', email: 'user3@email.com', password: `${bcrypt.hashSync('pass3', 12)}`},
        {username: 'User 4', email: 'user4@email.com', password: `${bcrypt.hashSync('pass4', 12)}`},
        {username: 'User 5', email: 'user5@email.com', password: `${bcrypt.hashSync('pass5', 12)}`},
      ]);
    });
};
