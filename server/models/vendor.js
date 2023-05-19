const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VendorSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 100 },
    main_contact: { type: String, required: true, maxLength: 100 },
    phone_number: { type: Number, required: true, maxLenght: 13 },
    email: { type: String, required: true, trim: true, maxLength: 100 },
    address_line_1: { type: String, required: true, maxLength: 100 },
    address_line_2: { type: String, maxLength: 100 },
    city: { type: String, required: true, maxLength: 100 },
    state: { type: String, required: true, maxLength: 2 },
    zip_code: { type: String, required: true, maxLength: 5 },
    customer_number: { type: String, required: true, maxLength: 100 },
  },
  { timestamps: true }
);

VendorSchema.virtual("url").get(function () {
  return `/erp/vendor/${this._id}`;
});

module.exports = mongoose.model("Vendor", VendorSchema);
