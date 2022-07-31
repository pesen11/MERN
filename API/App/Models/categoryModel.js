const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoryModel = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parent_id: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    brand: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Label",
      },
    ],
    show_in_homepage: {
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

module.exports = mongoose.model("Category", categoryModel);
