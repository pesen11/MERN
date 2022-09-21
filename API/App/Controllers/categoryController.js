const categoryModel = require("../Models/categoryModel");
const CategoryService = require("../Services/categoryService");

class CategoryController {
  constructor() {
    this.cat_svc = new CategoryService();
  }
  addCategory = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }

      if (data.brands) {
        data.brands = data.brands.split(",");
      }
      data.slug = this.cat_svc.getCategorySlug(data.title);

      this.cat_svc.validateCategory(data);

      let category = new categoryModel(data);

      let ack = await category.save();
      res.json({
        result: category,
        status: true,
        msg: "Category created succesfully.",
      });
    } catch (err) {
      next(err);
    }
  };

  getAllCats = async (req, res, next) => {
    try {
      let filter = {};
      if (req.query.show_in_homepage) {
        filter = {
          show_in_homepage: true,
        };
      }
      let cats = await categoryModel.find(filter).populate("parent_id").populate("brands");
      res.json({
        result: cats,
        status: true,
        msg: "Category fetched succesfully",
      });
    } catch (err) {
      next({
        status: 500,
        msg: err,
      });
    }
  };

  updateCategory = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }

      if (data.brands) {
        data.brands = data.brands.split(",");
      }
      this.cat_svc.validateCategory(data);

      let ack = await categoryModel.findByIdAndUpdate(req.params.id, {
        $set: data,
      });

      res.json({
        result: data,
        status: true,
        msg: "Category updated succesfully.",
      });
    } catch (err) {
      next(err);
    }
  };

  deleteCategoryById = async (req, res, next) => {
    try {
      let ack = await categoryModel.findByIdAndDelete(req.params.id);
      if (ack) {
        res.json({
          status: true,
          result: null,
          msg: "Category deleted succesfully.",
        });
      } else {
        next({
          status: 400,
          result: null,
          msg: "Category already deleted.",
        });
      }
    } catch (err) {
      next({
        status: 500,
        msg: err,
      });
    }
  };

  getCategoryById = async (req, res, next) => {
    try {
      let category = await categoryModel
        .findById(req.params.id)
        .populate("parent_id")
        .populate("brands");
      if (category) {
        res.json({
          result: category,
          status: true,
          msg: "Category fetched!",
        });
      } else {
        next({
          status: 500,
          msg: "Cannot fetch this category as it may not exists.",
        });
      }
    } catch (err) {
      next({
        status: 500,
        msg: err,
      });
    }
  };
}

module.exports = CategoryController;
