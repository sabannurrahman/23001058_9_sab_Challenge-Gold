const { User } = require("../models");
const bcrypt = require('bcrypt');
const { successResponse, errorResponse, serverErrorResponse } = require('../helper/fornatResponse');


const allUsers = async (req, res) => {
  try {
    const data = await User.findAll();
    console.log(data);  
    successResponse(res, data, "All Data");
  } catch (error) {
    console.log(error, "<<< error find all users");
  }
};

const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByPk(id);

    if (data === null) {
      return res.status(404).json({
        status: "failed",
        message: `data dengan id (${id}) tidak ditemukan`,
      });
    }
    data.destroy();
    successResponse(res, data, "User deleted successfully");
   
  } catch (error) {
    console.log(error, "<<< error find users");
  }
};


const editUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email, name, address } = req.body;
    const data = await User.findByPk(id);

    if (data === null) {
      return res.status(404).json({
        status: "failed",
        message: `data user dengan id  tidak ditemukan`,
      });
    }
 
 
    data.username = username;
    data.password = password;
    data.email = email;
    data.name = name;
    data.address = address;
    // data.role_ID  = role_ID;

    data.save();
    const data2 = {
      user_ID: data.id,
      username: data.username,
      password: data.password,
      email: data.email,
      name: data.name,
      address: data.address,
      updatedat: data.updatedat,
    }
    successResponse(res, data2, "User edit successfully"); 
  
  } catch (error) {
    if (error.errors) {
      errorResponse(res, error.errors.map(err => err.message));
    } else {
      serverErrorResponse(res);
    }
    console.log(error, "<<< error edit users");
  }
};


module.exports = {
    allUsers,
    deleteUsers,
    editUsers
  };