// CONNECTION - Server call, port listening

const request = require('supertest'); // https://www.npmjs.com/package/supertest
const app = require('../app');

// LISTENING TO PORT
describe('SERVER TESTS: ', () => {
  // 
  describe('SERVER listening on port: ', () => {
    test('Server should be listening and return status 200', async () => {
      const response = await request(app).get('/');
      expect(response.status).toEqual(200);
    });
  });
});