const { User } = require("../models");
const bcrypt = require('bcrypt');
const { successResponse, errorResponse, serverErrorResponse } = require('../helper/fornatResponse');

const createUsers = async (req, res) => {
  try {
    const { username, password, passwordMatch, email, name, address, role_ID } = req.body;
    
    if(password != passwordMatch){
      return res.status(400).json({ 
        message :"Fail",
        error : ["password not matches"]
    });
  }
    
    const newUser = await User.create({
      username: username,
      password: password,
      email: email,
      name: name,
      address: address,
      role_ID : role_ID
    });

    const data = {
      id: newUser.user_ID,
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
      name: newUser.name,
      address: newUser.address,
      role_ID : newUser.role_ID,
      createdat: newUser.createdat,
      updatedat: newUser.updatedat,
    }
    successResponse(res, data, "User created successfully"); 
  } catch (error) {
    if (error.errors) {
      errorResponse(res, error.errors.map(err => err.message));
    } else {
      serverErrorResponse(res);
    }
    console.log(error, "<<< error create users");
  }
};

module.exports = { createUsers };
