'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(8)
      },
      name_item: {
        allowNull: false,
        unique : true,
        type: Sequelize.STRING(50)
      },
      price: {
        type: Sequelize.FLOAT(20)
      },
      quantity: {
        type: Sequelize.INTEGER(10)
      },
      description: {
        type: Sequelize.TEXT
      },
      category_id: {
        allowNull: false,
        references: {
          model: 'Categories', // Nama tabel yang akan di-referensikan
          key: 'category_id',      // Kolom pada tabel yang akan di-referensikan
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER(4)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  }
};