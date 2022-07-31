const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    images: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 98,
    },
    afterDiscount: {
      type: Number,
      min: 1,
    },

    seller: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },

    brands: {
      type: mongoose.Types.ObjectId,
      ref: "Label",
      default: null,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: String,
      enum: ["active", "inactive", "out-of-stock"],
      default: "inactive",
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
