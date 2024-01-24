const { User, Role } = require("../models");
const bcrypt = require('bcrypt');
const {
  successResponse,
  errorResponse,
  notfoundResponse,
  serverErrorResponse,
} = require("../helper/fornatResponse");

exports.allUsers = async (req, res) => {
  try {
    // view all User
    const data = await User.findAll({
      include:[
        {
          model:Role,
          attributes : { exclude:["createdAt", "updatedAt", "role_id"]}
        }
      ]  
      
    }); //ambil semua data
    successResponse(res, data, "all  data User");
  } catch (error) {
    serverErrorResponse(res);
    //Note: Console.log yg tidak terpakai bisa dihapus saja
    console.log(error, "<<< error read data user");
  }
};

exports.detailUser = async (req, res) => {
  try {
    // view detail User
    const { id } = req.params;
    const data = await User.findByPk(id, {
        include:[
          {
            model:Role,
            attributes : { exclude:["createdAt", "updatedAt", "role_id"]}
          }
        ]   
      }
      
      ); //mengecek data yang sesuai dengan id request
    if (data === null) {
      notfoundResponse(res, `data user by id (${id}) is not found`);
    } else {
      successResponse(res, data, `detail user by id (${id})`);
    }
  } catch (error) {
      serverErrorResponse(res);
    console.log(error, "<<< error detail user");
  }
};

exports.editUser = async (req, res) => {
  try {
    // edit User
    const { id } = req.params;
    await User.update(req.body, {
      where: {
        user_id: id
      }
    });
    const newData = await User.findByPk(id);
    if (newData === null) {
      notfoundResponse(res, `data user by id (${id}) is not found`);
    } else {
      successResponse(res, newData, `edit user by id (${id}) successfully`);
    }

  } catch (error) {
    if (error.errors) {
      errorResponse(
        res,
        error.errors.map((err) => err.message)
      );
    } else {
      serverErrorResponse(res);
    }
    console.log(error, "<<< error edit User");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // delete User
    const { id } = req.params;
    const newData = await User.findByPk(id);
    if (newData === null) {
      return notfoundResponse(res, `data user by id (${id}) is not found`);
    }

    await User.destroy({
      where: {
        user_id: id
      }
    });
      successResponse(res, newData, `delete user by id (${id}) successfully`);
  } catch (error) {
      serverErrorResponse(res);
    console.log(error, "<<< error delete user");
  }
};















// const allUsers = async (req, res) => {
//   try {
//     const data = await User.findAll();
 
//     successResponse(res, data, "All Data");
//   } catch (error) {
//     console.log(error, "<<< error find all users");
//   }
// };

// const deleteUsers = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const data = await User.findByPk(id);

//     if (data === null) {
//       return res.status(404).json({
//         status: "failed",
//         message: `data dengan id (${id}) tidak ditemukan`,
//       });
//     }
//     data.destroy();
//     successResponse(res, data, "User deleted successfully");
   
//   } catch (error) {
//     console.log(error, "<<< error find users");
//   }
// };


// const editUsers = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { username, password, email, name, address } = req.body;
//     const data = await User.findByPk(id);

//     if (data === null) {
//       return res.status(404).json({
//         status: "failed",
//         message: `data user dengan id  tidak ditemukan`,
//       });
//     }
 
 
//     data.username = username;
//     data.password = password;
//     data.email = email;
//     data.name = name;
//     data.address = address;
//     // data.role_ID  = role_ID;

//     data.save();
//     const data2 = {
//       user_ID: data.id,
//       username: data.username,
//       password: data.password,
//       email: data.email,
//       name: data.name,
//       address: data.address,
//       updatedat: data.updatedat,
//     }
//     successResponse(res, data2, "User edit successfully"); 
  
//   } catch (error) {
//     if (error.errors) {
//       errorResponse(res, error.errors.map(err => err.message));
//     } else {
//       serverErrorResponse(res);
//     }
//     console.log(error, "<<< error edit users");
//   }
// };


// module.exports = {
//     allUsers,
//     deleteUsers,
//     editUsers
//   };