'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Myselves', [{
      name: 'John',
      bio: 'I am a new user to this application',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'johnDoe@test.com'
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Myselves', [{
      first_name: 'John'
    }]);
  }
};
