const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LaborCategorySchema = new Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 100 },
  },
  { timestamps: true }
);

LaborCategorySchema.virtual("url").get(function () {
  return "/erp/laborcategory/" + this._id;
});

module.exports = mongoose.model("LaborCategory", LaborCategorySchema);
