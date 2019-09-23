
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tabs').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tabs').insert([
        {url: 'https://www.reddit.com/', title: 'Reddit', category: 'Social Media', user_id: 2},
        {url: 'https://www.reddit.com/', title: 'Reddit', category: 'Social Media', user_id: 1},
        {url: 'https://www.reddit.com/', title: 'Reddit', category: 'Social Media', user_id: 5},
        {url: 'https://www.npmjs.com/', title: 'NPM', category: 'Programming', notes: 'Used for downloading packages', user_id: 3},
        {url: 'https://www.npmjs.com/', title: 'NPM', category: 'Programming', notes: 'Used for downloading packages', user_id: 4},
        {url: 'https://www.npmjs.com/', title: 'NPM', category: 'Programming', notes: 'Used for downloading packages', user_id: 2},
        {url: 'https://www.npmjs.com/', title: 'NPM', category: 'Programming', notes: 'Used for downloading packages',  user_id: 1},
      ]);
    });
};
