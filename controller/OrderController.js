const { Order, Item, User } = require("../models");
const {
  successResponse,
  errorResponse,
  notfoundResponse,
  serverErrorResponse,
} = require("../helper/fornatResponse");

// Membuat order baru
exports.createOrder = async (req, res) => {
  try {
    let { quantity_order, status, user_id, item_id } = req.body; //mangambil request body postman
    // Create a new order
    const idItem = await Item.findByPk(item_id)
    const price2 = idItem.price 
    const newData = await Order.create({
      quantity_order, 
      total_order : quantity_order * price2, 
      status, 
      user_id, 
      item_id
    });
    //respon sukses dengan helper
    successResponse(res, newData, "Order created successfully");
  } catch (error) {
    if (error.errors) {
      errorResponse(
        res,
        error.errors.map((err) => err.message) //mengambil error message dari validasi
      );
    } else {
      serverErrorResponse(res); //server eoer
    }
    console.log(error, "<<< error create category");
  }
};

exports.allOrders = async (req, res) => {
  try {
    // view all Order
    const data = await Order.findAll({
      include:[
        {
          model:Item,
          attributes : { exclude:["createdAt", "updatedAt", "category_id"]}
        },
        {
          model:User,
          attributes : { exclude:["createdAt", "updatedAt", "role_id", "user_id", "password"]}
        }
      ]
    }
  ); //ambil semua data
    successResponse(res, data, "All Data Orders");
  } catch (error) {
      serverErrorResponse(res);
    console.log(error, "<<< error read All Orders");
  }
};

exports.detailOrder = async (req, res) => {
  try {
    // view detail Order
    const { id } = req.params;
    const data = await Order.findByPk(id,
      {
        include:[
          {
            model:Item,
            attributes : { exclude:["createdAt", "updatedAt", "category_id"]}
          },
          {
            model:User,
            attributes : { exclude:["createdAt", "updatedAt", "role_id", "user_id", "password"]}
          }
        ]
      } 
      ); //mengecek data yang sesuai dengan id request
    if (data === null) {
      notfoundResponse(res, `data Order by No id (${id}) is not found`);
    } else {
      successResponse(res, data, `detail category by No id (${id})`);
    }
  } catch (error) {
      serverErrorResponse(res);
    console.log(error, "<<< error detail order");
  }
};

exports.statusKirim = async (req, res) => {
  try {
    // edit status order
    const { id } = req.params;

    await Order.update({status : "Barang Dikirim"}, {
      where: {
        no_order: id
      }
    });
    const newData = await Order.findByPk(id);
    if (newData === null) {
      notfoundResponse(res, `data  by id (${id}) is not found`);
    } else {
      successResponse(res, newData, `edit status by id (${id}) successfully`);
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
    console.log(error, "<<< error edit status");
  }
};

exports.statusSelesai= async (req, res) => {
  try {
    // edit status order
    const { id } = req.params;

    await Order.update({status : "Di Terima"}, {
      where: {
        no_order: id
      }
    });
    const newData = await Order.findByPk(id);
    if (newData === null) {
      notfoundResponse(res, `data  by id (${id}) is not found`);
    } else {
      successResponse(res, newData, `edit status by id (${id}) successfully`);
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
    console.log(error, "<<< error edit status");
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    // delete Order
    const { id } = req.params;
    const newData = await Order.findByPk(id);
    if (newData === null) {
      return notfoundResponse(res, `data order by id (${id}) is not found`);
    }

    await Order.destroy({
      where: {
        no_order: id
      }
    });
      successResponse(res, newData, `delete order by id (${id}) successfully`);

  } catch (error) {
      serverErrorResponse(res);
    console.log(error, "<<< error delete order");
  }
};

