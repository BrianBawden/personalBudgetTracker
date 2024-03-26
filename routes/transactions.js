const express = require('express');
const transaction = express.Router();

const transactionsController = require('../controllers/transactions');

const { userValidationRules, validate } = require('../middleware/validate');

transaction.get('/', transactionsController.getData);

transaction.get('/:id', transactionsController.getItem);

transaction.post('/', userValidationRules(), validate, transactionsController.postItem);

transaction.put('/:id', userValidationRules(), validate, transactionsController.putItem);

transaction.delete('/:id', transactionsController.deleteItem);

module.exports = transaction;
