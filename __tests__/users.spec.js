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
const bodyParser = require('body-parser'); // https://www.npmjs.com/package/body-parser
const { response } = require('../app');
appUsersTest.use(bodyParser.json());
appUsersTest.use(bodyParser.urlencoded({ extended: true }));
appUsersTest.use('/', routeUsers);

/**
 * Using with MongoDB - https://jestjs.io/docs/mongodb
 * Connection order execution - https://jestjs.io/docs/setup-teardown#scoping
 */
let server;
let userId;
let newUserId;
let userToChange;

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
  describe('ENDPOINT GET ALL /users/', () => {
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
  describe('ENDPOINT GET ONE /users/{id}', () => {
    test('It should return a list of users in JSON response', async () => {
      return await request(appUsersTest)
        .get(`/${userId}`)
        .expect(200)
        .then((response) => {
          userToChange = response.body;
          console.log('GET ONE');
          console.log(userToChange);
        });
    });
  });

  // POST
  describe('ENDPOINT POST /users/', () => {
    test('It should post a new user', async () => {
      const payload = {
        username: 'postUser',
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
      };
      return await request(appUsersTest)
        .post('/')
        .send(payload)
        .expect(201)
        .then((res) => {
          //  {
          //    "acknowledged": true,
          //    "insertedId": "660dff8f44287691a79e9033"
          //  }
          newUserId = res.body['insertedId'];
          console.log('POST');
          console.log(newUserId);
        });
    });
  });

  // PUT
  describe('ENDPOINT PUT /users/{id}', () => {
    test('It should put an existing user', async () => {
      return await request(appUsersTest)
        .put(`/${newUserId}`)
        .send({
          username: 'putUser',
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
        .expect(204)
        .then((res) => {
          console.log('PUT');
          console.log(res.body);
        });
    });
  });

  // DELETE
  describe('ENDPOINT DELETE /users/{id}', () => {
    test('It should delete an existing user', async () => {
      return await request(appUsersTest)
        .delete(`/${newUserId}`)
        .expect(200)
        .then((res) => {
          console.log('DELETE');
          console.log(res.body['message']);
        });
    });
  });
});
