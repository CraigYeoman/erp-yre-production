const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PartsSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 100 },
    customer_price: {
      type: Number,
      required: [true, "Customer price must be provided"],
    },
    cost: { type: Number, required: [true, "Company cost must be provided"] },
    part_number: { type: String, required: true, minLength: 3, maxLength: 100 },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
    },
    partCategory: {
      type: Schema.Types.ObjectId,
      ref: "PartCategory",
    },
    manufacture: { type: String, required: true, minLength: 3, maxLength: 100 },
  },
  { timestamps: true }
);

PartsSchema.virtual("url").get(function () {
  return "/erp/parts/" + this._id;
});

module.exports = mongoose.model("Parts", PartsSchema);
