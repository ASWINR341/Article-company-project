'use strict';

const { check } = require('express-validator');

module.exports = (method) => {
  switch (method) {
    case 'login': {
      return [
        check('email').trim().notEmpty().withMessage(
          'Email cannot be left blank'
        ).bail().isEmail().withMessage(
          'Email is not valid'
        ),
        check('password').trim().notEmpty().withMessage(
          'Password cannot be left blank'
        ).bail().isLength({ min: 3, max: 20 }).withMessage(
          'Password should be between 3 to 100 characters'
        )
      ];
    } case 'signup' : {
      return [
        check('email').trim().notEmpty().withMessage(
          'Email cannot be left blank'
        ).bail().isEmail().withMessage(
          'Email is not valid'
        ),
        check('name').trim().notEmpty().withMessage(
          'name cannot be left blank'
        ).bail().isLength({ min: 3, max: 15 }).withMessage(
          'name should be between 3 to 15 characters'
        ),
        check('password').trim().notEmpty().withMessage(
          'password cannot be left blank'
        ).bail().isLength({ min: 3, max: 100 }).withMessage(
          'password should be between 3 to 100 characters'
        )
      ];
    }
  }
};
