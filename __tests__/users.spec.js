const request = require('supertest'); // https://www.npmjs.com/package/supertest

// APP
const express = require('express'); // https://www.npmjs.com/package/express
const appUsersTest = new express();

// ENVIRONMENT
require('dotenv').config();
const port = process.env.PORT || 8080;

// CONNECTION - Database
const connection = require('../db/connect');

// CONNECTION - Routes users
const routeUsers = require('../routes/users');
const { response } = require('../app');
appUsersTest.use('/', routeUsers);

/**
 * Using with MongoDB - https://jestjs.io/docs/mongodb
 * Connection order execution - https://jestjs.io/docs/setup-teardown#scoping
 */
let server;
let userId;
let newUserId;

beforeAll(async () => {
  await connection.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(port);
      server = appUsersTest.listen(port);
    }
  });
});

// CLOSE DB CONNECTION AFTER TESTS
afterAll(async () => {
  await connection.closeDb();
  await server.close();
});

describe('RESOURCE: users', () => {
  // GET ALL
  describe('ENDPOINT /users/', () => {
    test('It should return a list of users in JSON response', async () => {
      return await request(appUsersTest)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response) => {
          const users = response.body;
          //It reads every user in the response
          // users.forEach((element) => {
          //   console.log(element.username);
          // });
          userId = users[0]._id;
          // console.log(users[0]);
        });
    });
  });

  // GET BY ID
  describe('ENDPOINT /users/{id}', () => {
    test('It should return a list of users in JSON response', async () => {
      return await request(appUsersTest)
        .get(`/${userId}`)
        .expect(200)
        .then((response) => {
          // console.log(response.body);
        });
    });
  });

  // POST
  describe('ENDPOINT /users/', () => {
    test('It should post a new user', async () => {
      return await request(appUsersTest)
        .post('/')
        .send({
          username: 'testUser',
          passwordHash: 'passwordHashTest',
          firstName: 'firstNameTest',
          lastName: 'lastNameTest',
          gender: 'genderTest',
          address: 'addressTest',
          location: 'locationTest',
          email: 'emailTest@test.com',
          phoneNumber: 'phoneNumberTest',
          registrationDate: 'registrationDateTest',
          profilePicture: 'profilePictureTest'
        })
        .set('Content-Type', 'application/json')
        .expect(422)
        .then((response) => {
          console.log(response.body);
          //           {
          //   "acknowledged": true,
          //   "insertedId": "660dff8f44287691a79e9033"
          // }
        });
    });
  });
});
