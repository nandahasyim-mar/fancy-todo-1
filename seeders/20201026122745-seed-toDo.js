'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('todos', [
     {
        title: "Learn REST API week 1",
        description: "prepare for lectur tomorrow",
        status: "to do",
        due_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Learn REST API bcrypt week 1",
        description: "prepare for lecture tomorrow",
        status: "to do",
        due_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
   ], {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('todos', null, {})
  }
};
