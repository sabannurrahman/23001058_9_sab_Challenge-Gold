'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // one to many 
      Item.belongsTo(models.Category, {
        foreignKey : 'category_id'
      })
      Item.hasMany(models.Order, {
        foreignKey : 'item_id'
      })

    }
  }
  Item.init({
    item_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name_item: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : {
        args : true,
        msg : "name item is already"
      },
      validate :{
        notNull :{
          msg : "name item is empty"
        }   
      }
    },
    price: {
      type:  DataTypes.FLOAT,
      allowNull: false,
      validate :{
        notNull :{
          msg : "price is empty"
        } 
      }
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isInt : {
        args : true,
        msg : "Quantity is not number"
      },
      validate :{
        notNull :{
          msg : "quantity is empty"
        },
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate :{
        notNull :{
          msg : "description is empty"
        } 
      }
    },
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};