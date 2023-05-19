require("dotenv").config();

const connectDB = require("./db/connect");
const Customer = require("./models/customer");
const JobType = require("./models/jobType");
const Labor = require("./models/labor");
const Parts = require("./models/parts");
const Vendor = require("./models/vendor");
const WorkOrder = require("./models/workOrder");
const Accessories = require("./models/accessories");

const jsonCustomers = require("./data/populateCustomers.json");
const jsonJobType = require("./data/populateJobType.json");
const jsonLabor = require("./data/populateLabor.json");
const jsonVendors = require("./data/populateVendors.json");
const jsonParts = require("./data/populateParts.json");
const jsonWorkOrder = require("./data/populateWorkOrder.json");
const jsonAccessories = require("./data/populateAccessories.json");

let model = WorkOrder;
let data = WorkOrder;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await model.deleteMany();
    // await model.create(data);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
