const express = require('express');
const transaction = express.Router();

const transactionsController = require('../controllers/transactions');

const { transactionValidationRules, validate } = require('../middleware/validate');

transaction.get('/', transactionsController.getData);

transaction.get('/:id', transactionsController.getItem);

transaction.post('/', transactionValidationRules(), validate, transactionsController.postItem);

transaction.put('/:id', transactionValidationRules(), validate, transactionsController.putItem);

transaction.delete('/:id', transactionsController.deleteItem);

module.exports = transaction;
