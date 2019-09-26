const request = require('supertest');
const db = require('../../data/db-config.js');

const Users = require('../users-model.js');

describe('users-model.js', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });
  describe('insert(user)', () => {
    it('should be able to add a new user to the database', async () => {
      const user = {
        username: 'user',
        email: 'user@email.com',
        password: 'pass'
      };

      await Users.insert(user);

      const users = await db('users');

      expect(users).toHaveLength(1);
    });
  });
  describe('findBy()', () => {
    it('should be able to find a user by user info', async () => {
      let response;
      const user = {
        username: 'user2',
        email: 'user2@email.com',
        password: 'pass2'
      };

      await Users.insert(user);

      await Users.findBy(user.username).then(res => {
        response = res;

        expect(response).toBe(false);
      });
    });
  });
});
