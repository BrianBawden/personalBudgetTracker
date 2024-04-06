const dotenv = require('dotenv');
const mongodb = require('mongodb');
dotenv.config();

// LOGGER
// https://www.npmjs.com/package/winston
const logger = require('../utils/logger');

// https://stackoverflow.com/questions/58354629/moving-nodejs-mongodb-connection-code-to-another-file
const mongoClient = mongodb.MongoClient;

const connectionString = process.env.MONGODB_URI;

let _db;

const initDb = async (callback) => {
  if (_db) {
    // eslint-disable-next-line no-console
    logger.info('Db is already initialized!');
    return callback(null, _db);
  }

  await mongoClient
    .connect(connectionString)
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

const closeDb = () => {
  if (_db) {
    _db.close();
    _db = null;
    logger.info('Db connection closed');
  } else {
    logger.info('Db connection not initialized');
  }
};


module.exports = {
  initDb,
  getDb,
  closeDb
};
