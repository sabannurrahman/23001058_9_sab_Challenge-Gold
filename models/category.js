'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    category_id :{
      allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name_category: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : {
        args : true,
        msg : "name category is already"
      },
      validate :{
        notNull :{
          msg : "name Category is empty"
        }
        
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};