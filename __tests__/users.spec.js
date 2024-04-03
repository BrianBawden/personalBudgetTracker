const request = require('supertest'); // https://www.npmjs.com/package/supertest

// CONNECTION - Routes users
const routeUsers = require('../routes/users');
const express = require('express'); // https://www.npmjs.com/package/express
const appUsersTest = new express();
appUsersTest.use('/', routeUsers);

describe('RESOURCE: users', () => {

  // GET ALL
  describe('ENDPOINT /users/', () => {
    test('It should return a list of users in JSON response', async () => {
      const response = await request(appUsersTest).get('/');
      console.log(response.body);
      expect(response.status).toEqual(200);
    });
  });

  // POST
  describe('ENDPOINT /users/', () => {
    test('It should post a new user', async () => {
      const newUser = {
        username: 'username',
        passwordHash: 'passwordHash',
        firstName: 'firstName',
        lastName: 'lastName',
        gender: 'gender',
        address: 'address',
        location: 'location',
        email: 'email@email.com',
        phoneNumber: 'phoneNumber',
        registrationDate: 'registrationDate',
        profilePicture: 'profilePicture'
      };
      const response = await request(appUsersTest)
        .post('/')
        .send(newUser)
      ;
      console.log(response.body);
      expect(response.status).toEqual(200);
    });
  });

  // GET BY ID
  describe('ENDPOINT /users/{id}', () => {
    // test('It should return a list of users in JSON response', async () => {
    //   const response = await request(app).get('/api/users');
    //   expect(response.status).toEqual(200);
    //   expect(response.type).toEqual('application/json');
    // });
  });
});
