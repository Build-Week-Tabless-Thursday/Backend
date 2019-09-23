
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'User 1', email: 'user1@email.com', password: 'pass1'},
        {username: 'User 2', email: 'user2@email.com', password: 'pass2'},
        {username: 'User 3', email: 'user3@email.com', password: 'pass3'},
        {username: 'User 4', email: 'user4@email.com', password: 'pass4'},
        {username: 'User 5', email: 'user5@email.com', password: 'pass5'},
      ]);
    });
};
