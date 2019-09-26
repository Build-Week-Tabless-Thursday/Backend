const request = require('supertest');
const db = require('../../data/db-config.js');
const Tabs = require('../tabs-model.js');
const Users = require('../users-model.js');

const user = {
  username: 'user',
  email: 'user@email.com',
  password: 'pass'
};

describe('tabs-model.js', () => {
  beforeEach(async () => {
    await db('tabs').truncate();
    await db('users').truncate();
    await Users.insert(user);
  });
  describe('insert()', () => {
    const tab = {
      url: 'https://www.soundcloud.com',
      title: 'SoundCloud'
    };

    it('should be able to add a tab', async () => {
      await Tabs.insert({ ...tab, user_id: 1 });

      const tabs = await db('tabs');

      expect(tabs).toHaveLength(1);
    });
  });

  describe('update()', () => {
    it('should be able to update a tab', async () => {
      const tab = {
        url: 'https://www.soundcloud.com',
        title: 'SoundCloud'
      };

      const newTab = {
        url: 'https://www.reddit.com',
        title: 'Reddit'
      };
      await Tabs.update(1, newTab);
      const tabs = await db('tabs');
      console.log(tabs);
      expect(tabs[0]).toBe(false);
    });
  });
});
