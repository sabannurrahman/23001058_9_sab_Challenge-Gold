const { Category } = require("../models");
const {
  successResponse,
  errorResponse,
  notfoundResponse,
  serverErrorResponse,
} = require("../helper/fornatResponse");

// Membuat kategori baru
exports.createCategories = async (req, res) => {
  try {
    let { name_category } = req.body; //mangambil request body postman
    // Create a new category
    const newData = await Category.create({
      name_category: name_category, 
    });
    //respon sukses dengan helper
    successResponse(res, newData, "Category created successfully");
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

exports.allCategories = async (req, res) => {
  try {
    // view all Category
    const data = await Category.findAll(); //ambil semua data
    successResponse(res, data, "all  data Category");
  } catch (error) {
      serverErrorResponse(res);
    console.log(error, "<<< error create category");
  }
};

exports.detailCategory = async (req, res) => {
  try {
    // view detail Category
    const { id } = req.params;
    const data = await Category.findByPk(id); //mengecek data yang sesuai dengan id request
    if (data === null) {
      notfoundResponse(res, `data category by id (${id}) is not found`);
    } else {
      successResponse(res, data, `detail category by id (${id})`);
    }
  } catch (error) {
      serverErrorResponse(res);
    console.log(error, "<<< error detail category");
  }
};

exports.editCategories = async (req, res) => {
  try {
    // edit Category
    const { id } = req.params;
    await Category.update(req.body, {
      where: {
        category_id: id
      }
    });
    const newData = await Category.findByPk(id);
    if (newData === null) {
      notfoundResponse(res, `data category by id (${id}) is not found`);
    } else {
      successResponse(res, newData, `edit category by id (${id}) successfully`);
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
    console.log(error, "<<< error edit Category");
  }
};

exports.deleteCategories = async (req, res) => {
  try {
    // delete Category
    const { id } = req.params;
    const newData = await Category.findByPk(id);
    if (newData === null) {
      return notfoundResponse(res, `data category by id (${id}) is not found`);
    }

    await Category.destroy({
      where: {
        category_id: id
      }
    });
     
      successResponse(res, newData, `delete category by id (${id}) successfully`);


  } catch (error) {
      serverErrorResponse(res);
    console.log(error, "<<< error edit Category");
  }
};

