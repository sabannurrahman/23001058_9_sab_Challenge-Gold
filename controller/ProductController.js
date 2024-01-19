const { User } = require("../models");

const allUsers = async (req, res) => {
  try {
    const data = await User.findAll();
    const result = {
      status: "ok",
      data: data,
    };
    res.json(result);
  } catch (error) {
    console.log(error, "<<< error find all users");
  }
};

const usersById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByPk(id);

    if (data === null) {
      return res.status(404).json({
        status: "failed",
        message: `data dengan id (${id}) tidak ditemukan`,
      });
    }
    res.json({
      status: "ok",
      data: data,
    });
  } catch (error) {
    console.log(error, "<<< error find users by id");
  }
};

const createUsers = async (req, res) => {
  try {
    const { username, password, email, nama, alamat } = req.body;
    const newUser = await User.create({
      username: username,
      password: password,
      email: email,
      nama: nama,
      alamat: alamat,
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
        createdat: newUser.createdat,
        updatedat: newUser.updatedat,
      },
    });
  } catch (error) {
    console.log(error, "<<< error create users");
  }
};

const editUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email, nama, alamat } = req.body;
    const data = await User.findByPk(id);

    if (data === null) {
      return res.status(404).json({
        status: "failed",
        message: `data user dengan id (${id}) tidak ditemukan`,
      });
    }
    data.username = username;
    data.password = password;
    data.email = email;
    data.nama = nama;
    data.alamat = alamat;

    data.save();
    res.json({
      status: "ok",
      data: {
        id: data.id,
        username: data.username,
        password: data.password,
        email: data.email,
        nama: data.nama,
        alamat: data.alamat,
        createdat: data.createdat,
        updatedat: data.updatedat,
      },
    });
  } catch (error) {
    console.log(error, "<<< error create users");
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

    res.json({
      status: "ok",
      message: `data dengan id (${id}) berhasil di hapus`,
    });
  } catch (error) {
    console.log(error, "<<< error find users by id");
  }
};

module.exports = {
  allUsers,
  usersById,
  createUsers,
  editUsers,
  deleteUsers,
};
