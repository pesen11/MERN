const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addressSchemaDef = new Schema({
  address: String,
  house_no: Number,
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    role: [
      {
        type: String,
        enum: ["admin", "seller", "customer"],
        default: "active",
      },
    ],
    role_id: {
      type: mongoose.Types.ObjectId, //foreign key linking
      ref: "Role",
      default: null,
    },

    address: {
      shipping: addressSchemaDef,
      billing: addressSchemaDef,
    },
  },
  {
    timeStamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

module.exports = mongoose.model("User", userSchema);
