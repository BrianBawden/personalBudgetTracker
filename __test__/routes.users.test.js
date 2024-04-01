/**
 * https://medium.com/@it.ermias.asmare/node-js-express-with-jest-and-supertest-e58aaf4c4514
 */

// https://www.npmjs.com/package/supertest
const request = require('supertest');
const app = require('../app');

describe('RESOURCE /users/', () => {
  // GET ALL
  it('It should response the GET method', (done) => {
    request(app)
      .get('/api-docs/users/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // POST
  test('Should create a new user', async () => {
    let productId = ' ';
    return request(app)
      .post('/api/users/')
      .send({
        'username': 'username',
        'passwordHash': 'passwordHash',
        'firstName': 'firstName',
        'lastName': 'lastName',
        'gender': 'gender',
        'address': 'address',
        'location': 'location',
        'email': 'email@email.com',
        'phoneNumber': 'phoneNumber',
        'registrationDate': 'registrationDate',
        'profilePicture': 'profilePicture'
      })
      .expect(201)
      .then(({ body }) => {
        productId = body.data.insertedId;
      });
  });
});
