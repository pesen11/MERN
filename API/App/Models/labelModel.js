const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: null,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["brand", "banner"],
      default: "banner",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

module.exports = mongoose.model("Label", labelSchema);
