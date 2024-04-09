const express = require('express');
const budgets = express.Router();

const budgetsController = require('../controllers/budgets');

const { budgetValidationRules, validate } = require('../middleware/validate');

/** BUDGETS */
// List
budgets.get('/', budgetsController.getData);
// Item
budgets.get('/:id', budgetsController.getItem);
// Post
budgets.post('/', budgetValidationRules(), validate, budgetsController.postItem);
// Put
budgets.put('/:id', budgetValidationRules(), validate, budgetsController.putItem);
// Delete
budgets.delete('/:id', budgetsController.deleteItem);

module.exports = budgets;