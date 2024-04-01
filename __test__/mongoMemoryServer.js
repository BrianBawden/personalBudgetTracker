const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongodbMs;
let connection;

beforeAll(async () => {
  mongodbMs = await MongoMemoryServer.create();
  const uri = mongodbMs.getUri();
  const mongoClient = await MongoClient();
  connection =  mongoClient.connect(uri);
  console.log('BEFORE ALL')
});

afterAll(async (done) => {
  await connection.disconnect(done);
  // await mongoClient.close();
  // await connection.stop();
});

afterEach(async () => {
  const collections = connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
  console.log('AFTER EACH')
});