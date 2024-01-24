'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
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
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING(15)
      },
      role_id: {
        allowNull: false,
        references: {
          model: 'Roles', // Nama tabel yang akan di-referensikan
          key: 'role_id',      // Kolom pada tabel yang akan di-referensikan
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER(2)
      },
      //Note: Penulisan nama kolom bisa dibuat konsisten. Beberapa kolom menggunakan snake_case tapi kolom dibawah pakai camelCase. Bisa dipilih salah 1 dan dibuat konsisten. Note ini berlaku untuk nama kolom di table lain
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