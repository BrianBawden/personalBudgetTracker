const { body, validationResult } = require('express-validator');

// Validation docs:
// - https://www.npmjs.com/package/express-validator
// - https://express-validator.github.io/docs
// A validation chain has three kinds of methods: validators, sanitizers and modifiers. - https://express-validator.github.io/docs/guides/validation-chain#features

/** USER */
// TODO Login - https://stackoverflow.com/questions/62630504/express-validator-isdate-and-isiso8601-are-always-false
const userValidationRules = () => {
  return [
    body('username').notEmpty().isLength({ min: 6 }).withMessage('username is required.'),
    body('passwordHash').notEmpty().withMessage('passwordHash is required.'),
    body('firstName').notEmpty().isLength({ min: 3 }).withMessage('firstName is required.'),
    body('lastName').notEmpty().isLength({ min: 3 }).withMessage('lastName is required.'),
    body('gender').notEmpty().withMessage('gender is required.'),
    body('address').notEmpty().withMessage('address is required.'),
    body('location').notEmpty().withMessage('location is required.'),
    body('email').isEmail().notEmpty().withMessage('email is required.'),
    body('phoneNumber').notEmpty().withMessage('phoneNumber is required.'),
    body('registrationDate').notEmpty().withMessage('registrationDate is required.'),
    body('profilePicture').notEmpty().withMessage('profilePicture is required.')
  ];
};

// EXAMPLE CODE
/** POST */
// const postValidationRules = () => {
//   return [
//     body('title')
//       .notEmpty()
//       .isLength({ min: 20, max: 50 })
//       .withMessage('Length must be between 20 and 30 characters.'),
//     body('subtitle')
//       .notEmpty()
//       .isLength({ min: 30, max: 60 })
//       .withMessage('Length must be between 30 and 50 characters.'),
//     body('content')
//       .notEmpty()
//       .isLength({ min: 200, max: 1500 })
//       .withMessage('Length must be between 200 and 1500 and characters.'),
//     body('cover')
//       .notEmpty()
//       .isLength({ min: 6 })
//       .withMessage('Length must be at least 6 characters.'),
//     body('author_name')
//       .notEmpty()
//       .isLength({ min: 3 })
//       .withMessage('Length must be at least 3 characters.'),
//     body('tag_name')
//       .trim()
//       .notEmpty()
//       .isLength({ min: 3 })
//       .withMessage('Length must be at least 3 characters.'),
//     body('published_on')
//       .notEmpty()
//       // .isDate()
//       .withMessage('Date is required.')
//   ];
// };

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  userValidationRules,
  validate
};
