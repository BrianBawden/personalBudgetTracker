const express = require('express');
const users = express.Router();

const usersController = require('../controllers/users');

const { userValidationRules, validate } = require('../middleware/validate');

/** USERS */
// List
users.get('/', usersController.getData);
// Item
users.get('/:id', usersController.getItem);
// Post
users.post('/', userValidationRules(), validate, usersController.postItem);
// Put
users.put('/:id', userValidationRules(), validate, usersController.putItem);
// Delete
users.delete('/:id', usersController.deleteItem);

module.exports = users;
