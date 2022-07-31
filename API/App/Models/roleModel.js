const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const roleSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timeStamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

module.exports = mongoose.model("Role", roleSchema);
