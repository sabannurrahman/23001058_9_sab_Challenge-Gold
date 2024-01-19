'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      user_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        name:'user_ID',
        type: Sequelize.INTEGER(8)
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(30)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(50)
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(150)
      },
      role_ID: {
        allowNull: false,
        references: {
          model: 'Roles', // Nama tabel yang akan di-referensikan
          key: 'role_ID',      // Kolom pada tabel yang akan di-referensikan
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER(2)
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};