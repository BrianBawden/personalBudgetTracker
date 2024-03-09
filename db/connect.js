const dotenv = require('dotenv');
const mongodb = require('mongodb');
dotenv.config();

// https://stackoverflow.com/questions/58354629/moving-nodejs-mongodb-connection-code-to-another-file
const mongoClient = mongodb.MongoClient;

const CONNECTION_STRING = process.env.MONGODB_URI;

let _db;

const initDb = (callback) => {
  if (_db) {
    // eslint-disable-next-line no-console
    console.log('Db is already initialized!');
    return callback(null, _db);
  }

  mongoClient
    .connect(CONNECTION_STRING)
    .then((selectedClient) => {
      _db = selectedClient;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
