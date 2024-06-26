const mongodbInstance = require('../db/connect');
const { ObjectId } = require('mongodb');

const DATABASE = process.env.DATABASE_NAME;
const COLLECTION = process.env.COLLECTION_USERS;

// Add Data Validation and Error Handling to simple Nodejs Project (cse341 lesson6 team activity)
// https://youtu.be/S0przpEKKGU

// GET LIST
const getData = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const response = await mongodbInstance.getDb().db(DATABASE).collection(COLLECTION).find();

    response.toArray().then((lists) => {
      if (lists.length == 0) {
        res.status(200).json({
          message: 'There is no content to display. Database is empty.'
        });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ITEM
const getItem = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    var selectedId = req.params.id;
    const collection = await mongodbInstance.getDb().db(DATABASE).collection(COLLECTION);

    var response = await collection.findOne({ _id: new ObjectId(selectedId) });

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

// POST
const postItem = async (req, res) => {
  // #swagger.tags = ['Users']
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add new user.',
        schema: {
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
					profilePicture: 'profilePictureTest',
        }
    } */
  try {
    const {
      username,
      passwordHash,
      firstName,
      lastName,
      gender,
      address,
      location,
      email,
      phoneNumber,
      registrationDate,
      profilePicture
    } = req.body;

    if (
      !username ||
      !passwordHash ||
      !firstName ||
      !lastName ||
      !gender ||
      !address ||
      !location ||
      !email ||
      !phoneNumber ||
      !registrationDate ||
      !profilePicture
    ) {
      res.status(400).send({ message: 'Content cannot be empty!' });
      return;
    }

    const collection = mongodbInstance.getDb().db(DATABASE).collection(COLLECTION);

    const newUser = {
      username,
      passwordHash,
      firstName,
      lastName,
      gender,
      address,
      location,
      email,
      phoneNumber,
      registrationDate,
      profilePicture
    };

    const response = await collection.insertOne(newUser).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the new user.'
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

// // PUT
const putItem = async (req, res) => {
  // #swagger.tags = ['Users']

  // IMPORTANT
  // This comment is required for the swagger-autogen tool
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update existing user data.',
       schema: {
					username: '',
					passwordHash: '',
					firstName: '',
					lastName: '',
					gender: '',
					address: '',
					location: '',
					email: '',
					phoneNumber: '',
					registrationDate: '',
					profilePicture: ''
        }
    } */

  try {
    const collection = await mongodbInstance.getDb().db(DATABASE).collection(COLLECTION);

    const selectedId = req.params.id;
    // Create a filter for items with the selected id
    const filter = { _id: new ObjectId(selectedId) };

    // Specify the update to set a value for the plot field
    const updatedUser = {};

    // Type alias UpdateFilter<TSchema>:
    // https://mongodb.github.io/node-mongodb-native/6.3/types/UpdateFilter.html
    const updateDoc = {
      $set: updatedUser
    };

    // Iterate over all body keys
    for (const key of Object.keys(req.body)) {
      if (req.body[key] !== null) {
        updatedUser[key] = req.body[key];
      }
    }

    // Set the upsert option to insert a document if no documents match the filter
    // Interface FindOneAndUpdateOptions:
    // https://mongodb.github.io/node-mongodb-native/4.0/interfaces/findoneandupdateoptions.html
    const options = { upsert: false };

    // Update the first document that matches the filter
    var response = await collection.findOneAndUpdate(filter, updateDoc, options);

    if (response != undefined) {
      res.status(204).json(response);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
const deleteItem = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    var selectedId = req.params.id;
    const collection = await mongodbInstance.getDb().db(DATABASE).collection(COLLECTION);

    // Delete the item by ID
    const response = await collection.deleteOne({
      _id: new ObjectId(selectedId)
    });

    if (response.deletedCount === 1) {
      res.status(200).json({
        message: `Item was deleted successfully.`,
        response
      });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getData, getItem, deleteItem, postItem, putItem };
