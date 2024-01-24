'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      no_order: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },
      quantity_order: {
        //Note: disini seharusnya quantity tidak boleh dibiarkan null. Bisa ditambahkan constraint allowNull: false
        type: Sequelize.INTEGER(10)
      },
      total_order: {
        //Note: disini seharusnya total belanja tidak boleh dibiarkan null. Bisa ditambahkan constraint allowNull: false
        type: Sequelize.FLOAT(20)
      },
      status: {
        type: Sequelize.STRING(20)
      },
      user_id: {
        type: Sequelize.INTEGER(8),
        allowNull: false,
        references: {
          model: 'Users', // Nama tabel yang akan di-referensikan
          key: 'user_id',      // Kolom pada tabel yang akan di-referensikan
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        },
      item_id: {
        type: Sequelize.INTEGER(8),
        allowNull: false,
        references: {
          model: 'Items', // Nama tabel yang akan di-referensikan
          key: 'item_id', 
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Orders');
  }
};