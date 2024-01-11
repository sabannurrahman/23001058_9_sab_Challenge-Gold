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

module.exports = {
    allUsers
  };