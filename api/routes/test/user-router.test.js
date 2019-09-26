const request = require('supertest');
const server = require('../../server.js');
const bcrypt = require('bcryptjs');
const Users = require('../../../models/users-model.js');

let token;

beforeAll(done => {
  request(server)
    .post('/login')
    .send({
      username: 'User 1',
      password: 'pass1'
    })
    .end((err, response) => {
      token = response.body.token;
      done();
    });
});

describe('user-router.js', () => {
  describe('GET /me', () => {
    it('should return a JSON object', () => {
      let response;
      return request(server)
        .get('/me')
        .then(res => {
          response = res;

          expect(response.type).toEqual('application/json');
        });
    });
    it('should return a 200 status code if user is authorized', () => {
      return request(server)
        .get('/me')
        .set('Authorization', token)
        .expect(200);
    });

    it('should return a 401 status code if user is not authorized', () => {
      return request(server)
        .get('/me')
        .set('Authorization', null)
        .expect(401);
    });
  });

  describe('PUT /me', () => {
    it('should update user info', () => {
      return request(server)
        .put('/me')
        .set('Authorization', token)
        .send({
          username: 'New User 1',
          password: 'newpass1',
          email: 'newemail@email.com'
        })
        .expect(200);
    });
  });
});
