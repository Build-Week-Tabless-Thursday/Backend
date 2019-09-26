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

  describe('findById()', () => {
    it('should be able to find a user by user ID', async () => {
      let response;
      const user = {
        username: 'user2',
        email: 'user2@email.com',
        password: 'pass2'
      };

      await Users.insert(user).then(async ids => {
        await Users.findById(ids[0]).then(res => {
          response = res;

          expect(response).toEqual({
            email: 'user2@email.com',
            id: 1,
            username: 'user2'
          });
        });
      });
    });
  });
  describe('update()', () => {
    it('should be able to update a user in the database', async () => {
      const user = {
        username: 'user2',
        email: 'user2@email.com',
        password: 'pass2'
      };
      const changedUser = {
        email: 'changed@email.com',
        password: 'changedpass',
        username: 'changed'
      };
      await Users.insert(user).then(async ids => {
        await Users.update(ids[0], changedUser).then(res => {
          response = res;

          expect(response).toEqual(1);
        });
      });
    });
  });

  describe('remove()', () => {
    it('should be able to remove a user from the database', async () => {
      const user = {
        username: 'user',
        email: 'user@email.com',
        password: 'pass'
      };

      await Users.insert(user);
      let users = await db('users');
      expect(users).toHaveLength(1);

      await Users.remove(1);

      users = await db('users');
      expect(users).toHaveLength(0);
    });
  });
});
