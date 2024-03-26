const mongodbInstance = require('../db/connect');
const { ObjectId } = require('mongodb');

const DATABASE = process.env.DATABASE_NAME;
const COLLECTION = process.env.COLLECTION_TRANSACTIONS;

const getData = async (req, res) => {
  // #swagger.tags = ['Transactions']

  try {
    const response = await mongodbInstance.getDb().db(DATABASE).collection(COLLECTION).find();

    response.toArray().then((lists) => {
      if (lists.length == 0) {
        res.status(200).json({
          message: 'Empty Database'
        });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getItem = async (req, res) => {
  // #swagger.tags = ['Transactions']

  try {
    const selectedId = req.params.id;
    const collection = await mongodbInstance.getDb().db(DATABASE).collection(COLLECTION);

    const response = await collection.findOne({ _id: new ObjectId(selectedId) });

    if (response == undefined) {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).json({ message: 'Item does not exist' });
      res.json(response);
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

const postItem = async (req, res) => {
  console.log('test');
};

const putItem = async (req, res) => {
  console.log('test');
};

const deleteItem = async (req, res) => {
  console.log('test');
};

module.exports = { getData, getItem, deleteItem, postItem, putItem };
