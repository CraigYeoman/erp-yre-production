const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const workOrderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Customer name must be provided"],
    },
    date_received: {
      type: Date,
      default: Date.now(),
    },
    date_due: {
      type: Date,
      required: [true, "Due date must be provided"],
    },
    date_finished: {
      type: Date,
    },
    deposit: {
      type: Number,
      default: 0,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    jobType: {
      type: Schema.Types.ObjectId,
      ref: "JobType",
      required: [true, "Job type must be provided"],
    },
    accessories: {
      type: Array,
    },
    parts: {
      type: Array,
    },

    labor: {
      type: Array,
    },
    notes: {
      type: String,
    },
    work_order_number: {
      type: Number,
      require: true,
    },
    images: {
      type: Array,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

workOrderSchema.virtual("url").get(function () {
  return `/api/v1/erp/workorders/${this._id}`;
});

workOrderSchema.virtual("date_received_formatted").get(function () {
  return DateTime.fromJSDate(this.date_received).toLocaleString(
    DateTime.DATE_MED
  );
});

workOrderSchema.virtual("date_due_formatted").get(function () {
  return this.date_due
    ? DateTime.fromJSDate(this.date_due).toLocaleString(DateTime.DATE_MED)
    : "";
});

module.exports = mongoose.model("WorkOrder", workOrderSchema);
