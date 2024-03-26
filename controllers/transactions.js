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
  // #swagger.tags = ['Transactions']
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Add new transaction',
    schema: {
      user_id: '',
      category_id: '',
      amount: '',
      date: '',
      description: '',
      paymentMethod: ''
    }
  }*/
  try {
    const { user_id, category_id, amount, date, description, paymentMethod } = req.body;

    if (!user_id || !category_id || !amount || !date || !description || !paymentMethod) {
      res.status(400).send({ message: 'All fields are required' });
      return;
    }

    const collection = mongodbInstance.getDb().db(DATABASE).collection(COLLECTION);

    const newTransaction = {
      user_id,
      category_id,
      amount,
      date,
      description,
      paymentMethod
    };

    const response = await collection.insertOne(newTransaction).catch((err) => {
      res.status(500).send({
        message: err.message || 'Something went wrong creating new transaction.'
      });
    });

    if (response) {
      res.status(201).json(response);
    } else {
      res.status(400).json({ message: 'BAD REQUEST' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const putItem = async (req, res) => {
  // #swagger.tags = ['Transactions']

  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update existing user data.',
      schema: {
        user_id: '',
        category_id: '',
        amount: '',
        date: '',
        description: '',
        paymentMethod: ''
      }
  } */

  try {
    const collection = await mongodbInstance.getDb().db(DATABASE).collection(COLLECTION);

    const selectedId = req.params.id;

    const filter = { _id: new ObjectId(selectedId) };

    let updatedUser = {};

    const updateDoc = {
      $set: updatedUser
    };

    for (const key of Object.keys(req.body)) {
      if (req.body[key] !== null) {
        updatedUser[key] = req.body[key];
      }
    }

    const options = { upsert: false };

    let response = await collection.findOneAndUpdate(filter, updateDoc, options);

    if (response != undefined) {
      res.status(204).json(response);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteItem = async (req, res) => {
  // #swagger.tags = ['Transactions']

  try {
    const selectedId = req.params.id;
    const collection = await mongodbInstance.getDb().db(DATABASE).collection(COLLECTION);

    const response = await collection.deleteOne({
      _id: new ObjectId(selectedId)
    });

    if (response.deletedCount === 1) {
      res.status(200).json({
        message: 'Item was deleted successfully.',
        response
      });
    } else {
      res.status(404).json({ message: 'Item not found.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getData, getItem, deleteItem, postItem, putItem };
