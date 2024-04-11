const express = require('express');
const categories = express.Router();

const categoriesController = require('../controllers/categories');

const { categoriesValidationRules, validate } = require('../middleware/validate');

/** USERS */
// List
categories.get('/', categoriesController.getData);
// Item
categories.get('/:id', categoriesController.getItem);
// Post
categories.post('/', categoriesValidationRules(), validate, categoriesController.postItem);
// Put
categories.put('/:id', categoriesValidationRules(), validate, categoriesController.putItem);
// Delete
categories.delete('/:id', categoriesController.deleteItem);

module.exports = categories;