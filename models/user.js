"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      // many to one (table user and table role)
      User.belongsTo(models.Role, {
        foreignKey : 'role_id'
      }),
   
      User.hasMany(models.Order, {
        foreignKey : 'user_id'
      })
      //Note: Jika sudah tidak digunakan bisa dihapus saja
      // User.belongsToMany(models.Item,{
      //   through: 'Orders',
      //   // foreignKey: 'userId',
      //   // as : 'historyOrders'
      // })

    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { args: true, msg: "username is already" },
        isInt: true,
        validate: {
          notNull: { msg: "Username is empty" },
          len: {
            args: [6, 30],
            msg: "username must be at least 6 characters",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is empty" },
          len: { args: [6, 255], msg: "Password must be at least 6 characters" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is empty" },
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "address is empty" },
        },
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Phone Number is empty" },
        },
      },
      role_id: {
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
        validate: {
          notNull: { msg: "Email is empty" },
          isEmail: { msg: "Incorrect email format" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  // Hooks untuk hash password sebelum disimpan
  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10), 
      null
    );
  });
  User.prototype.CorectPassword = async (reqPassword, passwordDB) => {
    //Note: Disini tidak perlu async await karena sudah pakai method bcrypt.compareSync
    return await bcrypt.compareSync(reqPassword, passwordDB)
  }
  return User;
};
