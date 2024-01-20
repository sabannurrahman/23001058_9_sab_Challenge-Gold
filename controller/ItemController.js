const { Item, Category } = require("../models");
const {
  successResponse,
  errorResponse,
  notfoundResponse,
  serverErrorResponse,
} = require("../helper/fornatResponse");

// Membuat item baru
exports.createItems = async (req, res) => {
  try {
    let { name_item, price, quantity, description, category_id } = req.body; //mangambil request body postman
    // Create a new item
    const newData = await Item.create({
      name_item,
      price,
      quantity,
      description,
      category_id,
    });
    //respon sukses dengan helper
    successResponse(res, newData, "item created successfully");
  } catch (error) {
    if (error.errors) {
      errorResponse(
        res,
        error.errors.map((err) => err.message) //mengambil error message dari validasi
      );
    } else {
      serverErrorResponse(res); //server eoer
    }
    console.log(error, "<<< error create item");
  }
};

exports.allItems = async (req, res) => {
  try {
    // view all item
    const data = await Item.findAll({
      include:[
        {
          model:Category,
          attributes : { exclude:["createdAt", "updatedAt", "category_id"]}
        }
      ]
    }); //ambil semua data
    successResponse(res, data, "all  data Item");
  } catch (error) {
    serverErrorResponse(res);
    console.log(error, "<<< error read all Item");
  }
};

exports.detailItem = async (req, res) => {
  try {
    // view detail Item
    const { id } = req.params;
    const data = await Item.findByPk(id, 
      {
        include:[
          {
            model:Category,
            attributes : { exclude:["createdAt", "updatedAt", "category_id"]}
          }
        ]
      }
      
      ); //mengecek data yang sesuai dengan id request
    if (data === null) {
      notfoundResponse(res, `data item by id (${id}) is not found`);
    } else {
      successResponse(res, data, `detail item by id (${id})`);
    }
  } catch (error) {
    serverErrorResponse(res);
    console.log(error, "<<< error detail item");
  }
};

exports.editItems = async (req, res) => {
  try {
    // edit Item
    const { id } = req.params;
    await Item.update(req.body, {
      where: {
        item_id: id,
      },
    });
    const newData = await Item.findByPk(id);
    if (newData === null) {
      notfoundResponse(res, `data item by id (${id}) is not found`);
    } else {
      successResponse(res, newData, `edit item by id (${id}) successfully`);
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
    console.log(error, "<<< error edit Item");
  }
};

exports.deleteItems = async (req, res) => {
  try {
    // delete Item
    const { id } = req.params;
    const newData = await Item.findByPk(id);
    if (newData === null) {
      return notfoundResponse(res, `data iten by id (${id}) is not found`);
    }

    await Item.destroy({
      where: {
        item_id: id
      },
    });

    successResponse(res, newData, `delete item by id (${id}) successfully`);
  } catch (error) {
    serverErrorResponse(res);
    console.log(error, "<<< error delete item");
  }
};
