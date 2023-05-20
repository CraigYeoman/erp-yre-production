const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PartCategorySchema = new Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 100 },
  },
  { timestamps: true }
);

PartCategorySchema.virtual("url").get(function () {
  return "/erp/partcategory/" + this._id;
});

module.exports = mongoose.model("PartCategory", PartCategorySchema);
