const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccessoriesSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 100 },
  },
  { timestamps: true }
);

AccessoriesSchema.virtual("url").get(function () {
  return "/erp/accesories/" + this._id;
});

module.exports = mongoose.model("Accessories", AccessoriesSchema);
