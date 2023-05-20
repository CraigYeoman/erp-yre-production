const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    first_name: { type: String, required: true, maxLength: 100 },
    last_name: { type: String, required: true, maxLength: 100 },
    phone_number: { type: Number, required: true, maxLenght: 10 },
    email: { type: String, required: true, trim: true, maxLength: 100 },
    address_line_1: { type: String, required: true, maxLength: 100 },
    address_line_2: { type: String, maxLength: 100 },
    city: { type: String, required: true, maxLength: 100 },
    state: { type: String, required: true, maxLength: 2 },
    zip_code: { type: Number, required: true, maxLength: 5 },
  },
  { timestamps: true }
);

CustomerSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.last_name) {
    fullname = `${this.first_name} ${this.last_name} `;
  }
  if (!this.first_name || !this.family_name) {
    fullname = "";
  }
  return fullname;
});

CustomerSchema.virtual("url").get(function () {
  return `/api/v1/erp/customers/${this._id}`;
});

module.exports = mongoose.model("Customer", CustomerSchema);
