'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      role_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        name:'role_ID',
        type: Sequelize.INTEGER(2)
      },
      name: {
        type: Sequelize.STRING (20)
      }
   
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  }
};