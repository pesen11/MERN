const slugify = require("slugify");
const ProductService = require("../Services/productService");
const Product = require("../Models/productModel");

class ProductController {
  constructor() {
    this.prod_svc = new ProductService();
  }
  addProduct = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.files) {
        let images = [];

        req.files.map((image) => {
          images.push(image.filename);
        });
        data.images = images;
      }
      this.prod_svc.validateProduct(data);

      data.slug = slugify(data.name.toLowerCase());

      if (!data.discount) {
        data.discount = 0;
      }

      data.afterDiscount = data.price - (data.price * data.discount) / 100;
      if (!data.category) {
        data.category = null;
      }
      if (!data.brands) {
        data.brands = null;
      }
      if (!data.seller) {
        data.seller = null;
      }
      console.log(data);
      let product = new Product(data);
      let ack = await product.save();
      res.json({
        result: data,
        status: true,
        msg: "Product added succesfully.",
      });
    } catch (err) {
      next(err);
    }
  };

  getAllProducts = async (req, res, next) => {
    try {
      let filter = {};
      if (req.query.is_featured) {
        filter = {
          is_featured: req.query.is_featured,
        };
      }
      let prods = await Product.find(filter)
        .populate("category")
        .populate("brands")
        .populate("seller");
      res.json({
        result: prods,
        status: true,
        msg: "All products fetched succesfully.",
      });
    } catch (err) {
      next({
        status: 500,
        msg: err,
      });
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.files) {
        let images = [];

        req.files.map((image) => {
          images.push(image.filename);
        });
        data.images = images;
      }
      this.prod_svc.validateProduct(data);
      if (!data.discount) {
        data.discount = 0;
      }

      data.afterDiscount = data.price - (data.price * data.discount) / 100;

      let ack = await Product.findByIdAndUpdate(req.params.id, {
        $set: data,
      });

      res.json({
        result: data,
        status: true,
        msg: "Updated the product succesfully",
      });
    } catch (err) {
      next({
        status: 500,
        msg: err,
      });
    }
  };

  getProductById = async (req, res, next) => {
    try {
      let prod = await Product.findById(req.params.id)
        .populate("category")
        .populate("brands")
        .populate("seller");
      if (prod) {
        res.json({
          result: prod,
          status: true,
          msg: "Fetched product succesfully",
        });
      } else {
        next({
          status: 500,
          msg: "This product does not exists.",
        });
      }
    } catch (err) {
      next({
        status: 500,
        msg: err,
      });
    }
  };

  deleteProduct = async (req, res, next) => {
    try {
      let ack = await Product.findByIdAndDelete(req.params.id);
      if (ack) {
        res.json({
          status: true,
          result: null,
          msg: "Product deleted succesfully.",
        });
      } else {
        next({
          status: 400,
          result: null,
          msg: "Product already deleted.",
        });
      }
    } catch (err) {
      next({
        status: 500,
        msg: err,
      });
    }
  };

  getProductByCategory = async (req, res, next) => {
    try {
      let products = await Product.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: {
            path: "$category",
          },
        },
        {
          $match: {
            "category.slug": req.params.slug,
            status: "active",
          },
        },
        {
          $lookup: {
            from: "labels",
            localField: "brands",
            foreignField: "_id",
            as: "brands",
          },
        },
        {
          $unwind: {
            path: "$brands",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "seller",
            foreignField: "_id",
            as: "seller",
          },
        },
        {
          $unwind: {
            path: "$seller",
          },
        },
      ]);

      let filtered = products.filter((item) => item.category.slug === req.params.slug);
      res.json({
        result: filtered,
        status: true,
        msg: "Product fetched by category",
      });
    } catch (error) {
      next(error);
    }
  };

  getProductBySlug = async (req, res, next) => {
    try {
      let prod = await Product.findOne({ slug: req.params.slug })
        .populate("category")
        .populate("brands")
        .populate("seller");

      let related_prods = await Product.find({ category: prod.category._id, status: "active" })
        .populate("category")
        .populate("brands")
        .populate("seller");
      if (prod) {
        res.json({
          result: { detail: prod, related: related_prods },
          status: true,
          msg: "Fetched product succesfully",
        });
      } else {
        next({
          status: 500,
          msg: "This product does not exists.",
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

module.exports = ProductController;
