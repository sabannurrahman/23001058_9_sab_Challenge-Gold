'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey : 'user_id'
      })
      Order.belongsTo(models.Item, {
        foreignKey : 'item_id'
      })
    }
  }
  Order.init({
    no_order: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity_order: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate :{
        notNull :{
          msg : "quantity is empty"
        }
    
      }
    },
    total_order: {
      type : DataTypes.FLOAT,
      allowNull: false,
      validate :{
        notNull :{
          msg : "total order is empty"
        } 
      }
    },
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};