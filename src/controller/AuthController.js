const { User } = require("../models");
const bcrypt = require('bcrypt');

const createUsers = async (req, res) => {
  try {
    const { username, password, passwordMatch, email, nama, alamat, role_ID } = req.body;
    
    if(password != passwordMatch){
      return res.status(400).json({
        message :"Fail",
        error : ["password dan password konfirmasi tidak sama"]
    });
  }
    
    const newUser = await User.create({
      username: username,
      password: password,
      email: email,
      nama: nama,
      alamat: alamat,
      role_ID : role_ID
    });

    res.status(201).json({
      status: "ok",
      data: {
        id: newUser.user_ID,
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        nama: newUser.nama,
        alamat: newUser.alamat,
        role_ID : newUser.role_ID,
        createdat: newUser.createdat,
        updatedat: newUser.updatedat,
      },
    });
  } catch (error) {
    res.status(400).json({
      message :"error",
      error : error.errors.map(err => err.message)
    })
    console.log(error, "<<< error create users");
  }
};

module.exports = { createUsers };
