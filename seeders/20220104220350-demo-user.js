'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    module.exports = {
      up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
          firstName: 'John',
          lastName: 'Doe',
          email: 'example@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        }]);
      },
      down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
      }
    };
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
