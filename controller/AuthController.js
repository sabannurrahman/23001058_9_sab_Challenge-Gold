const { User } = require("../models");
const bcrypt = require('bcrypt');
const {
  successResponse,
  errorResponse,
  notfoundResponse,
  serverErrorResponse,
} = require("../helper/fornatResponse");

// Membuat user baru
exports.createUsers = async (req, res) => {
  try {
    let { username, password, passwordMatch, email, name, address, phone_number, role_id } = req.body; //mangambil request body postman
    //cek konfirmasi password
    if(password != passwordMatch){
      return res.status(400).json({ 
        message :"Fail",
        error : ["password not matches"]
    });
  }

    // Create a new user
    const newData = await User.create({
      username, 
      password,  
      email, 
      name, 
      address, 
      phone_number,
      role_id, 
    });
    //respon sukses dengan helper
    successResponse(res, newData, "User created successfully");
  } catch (error) {
    if (error.errors) {
      errorResponse(
        res,
        error.errors.map((err) => err.message) //mengambil error message dari validasi
      );
    } else {
      serverErrorResponse(res); //server eoer
    }
    console.log(error, "<<< error create user");
  }
};