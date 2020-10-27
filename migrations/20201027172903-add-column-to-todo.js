'use strict';

const todo = require("../models/todo");

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('todos', 'userId', {
      type: Sequelize.INTEGER,
      reference: {
          model: 'Users',
          key: 'id'
      },
    })
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('todos', 'userId')
  }
};
