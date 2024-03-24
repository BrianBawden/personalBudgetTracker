const { MongoClient, ObjectId } = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
		});
		console.log(`globalThis.__MONGO_URI__: ${globalThis.__MONGO_URI__}`);
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
		console.log(`globalThis.__MONGO_DB_NAME__: ${globalThis.__MONGO_DB_NAME__}`);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');
		const objectId = new ObjectId();

    const mockUser = { _id: objectId, name: 'John' };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: objectId });
    expect(insertedUser).toEqual(mockUser);
  });
});
