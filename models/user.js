"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      user_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "user_ID",
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { args: true, msg: "username sudah digunakan" },
        isInt: true,
        validate: {
          notNull: { msg: "Username belum di isi" },
          len: {
            args: [6, 30],
            msg: "Username min 6 karakter dan max 30 karakter",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password belum di isi" },
          len: { args: [6, 255], msg: "Password min 6 karakter" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Nama belum di isi" },
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Alamat belum di isi" },
        },
      },
      role_ID: {
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
        validate: {
          notNull: { msg: "Email belum di isi" },
          isEmail: { msg: "Format email salah" },
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
  return User;
};
