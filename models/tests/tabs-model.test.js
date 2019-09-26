const request = require('supertest');
const db = require('../../data/db-config.js');
const Tabs = require('../tabs-model.js');
const Users = require('../users-model.js');

const user = {
  username: 'user5',
  email: 'user5@email.com',
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

      await Tabs.insert({ ...tab, user_id: 1 });
      await Tabs.update(1, newTab);
      const tabs = await db('tabs');
      expect(tabs[0]).toEqual({
        category: null,
        due: null,
        id: 1,
        notes: null,
        preview: null,
        title: 'Reddit',
        url: 'https://www.reddit.com',
        user_id: 1
      });
    });
  });

  describe('remove()', () => {
    it('should be able to remove a tab', async () => {
      const tab = {
        url: 'https://www.soundcloud.com',
        title: 'SoundCloud'
      };

      await Tabs.insert({ ...tab, user_id: 1 });

      let tabs = await db('tabs');
      expect(tabs).toHaveLength(1);

      await Tabs.remove(1);
      tabs = await db('tabs');
      expect(tabs).toHaveLength(0);
    });
  });
});
