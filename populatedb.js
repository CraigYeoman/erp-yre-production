#! /usr/bin/env node

console.log(
  "This script populates some test data to the database. Specified database as argument"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Customer = require("./models/customer");
var JobType = require("./models/jobType");
var Labor = require("./models/labor");
var Parts = require("./models/labor");
var Vendor = require("./models/vendor");
var WorkOrder = require("./models/workOrder");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var customers = [];
var jobTypes = [];
var labors = [];
var parts = [];
var vendors = [];
var workOrders = [];

function customerCreate(
  first_name,
  last_name,
  phone_number,
  email,
  address_line_1,
  address_line_2,
  city,
  state,
  zip_code,
  cb
) {
  customerdetail = {
    first_name: first_name,
    last_name: last_name,
    phone_number: phone_number,
    email: email,
    address_line_1: address_line_1,
    address_line_2: address_line_2,
    city: city,
    state: state,
    zip_code: zip_code,
  };

  var customer = new Customer(customerdetail);

  customer.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Customer: " + customer);
    customers.push(customer);
    cb(null, customer);
  });
}

function jobTypeCreate(name, cb) {
  var jobType = new JobType({ name: name });

  jobType.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New jobType: " + jobType);
    jobTypes.push(jobType);
    cb(null, jobType);
  });
}

function laborCreate(name, price, cb) {
  labordetail = { name: name, price: price };
  var labor = new Labor(labordetail);

  labor.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New labor: " + labor);
    labors.push(labor);
    cb(null, labor);
  });
}

function vendorCreate(
  name,
  main_contact,
  phone_number,
  email,
  address_line_1,
  address_line_2,
  city,
  state,
  zip_code,
  customer_number,
  cb
) {
  vendordetail = {
    name: name,
    main_contact: main_contact,
    phone_number: phone_number,
    email: email,
    address_line_1: address_line_1,
    address_line_2: address_line_2,
    city: city,
    state: state,
    zip_code: zip_code,
    customer_number: customer_number,
  };

  var vendor = new Vendor(vendordetail);
  vendor.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New vendor: " + vendor);
    vendors.push(vendor);
    cb(null, vendor);
  });
}

function partsCreate(
  name,
  customer_price,
  cost,
  part_number,
  vendor,
  manufacture,
  cb
) {
  partsdetail = {
    name: name,
    customer_price: customer_price,
    cost: cost,
    part_number: part_number,
    vendor: vendor,
    manufacture: manufacture,
  };

  var part = new Parts(partsdetail);
  part.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New part: " + part);
    parts.push(part);
    cb(null, part);
  });
}

function workOrderCreate(
  customer,
  date_received,
  date_due,
  estimatedPrice,
  complete,
  jobType,
  accessories,
  parts,
  labor,
  notes,
  work_order_number,
  cb
) {
  workorderdetail = {
    customer: customer,
    date_received: date_received,
    date_due: date_due,
    estimatedPrice: estimatedPrice,
    complete: complete,
    jobType: jobType,
    accessories: accessories,
    parts: parts,
    labor: labor,
    notes: notes,
    work_order_number: work_order_number,
  };

  var workOrder = new WorkOrder(workorderdetail);
  workOrder.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New workOrder: " + workOrder);
    workOrders.push(workOrder);
    cb(null, workOrder);
  });
}

function createCustomerJobtypeLaborVendors(cb) {
  async.series(
    [
      function (callback) {
        customerCreate(
          "John",
          "Wayne",
          4174174141,
          "johnwayne@gmail.com",
          "2424 W. 8th St,",
          "",
          "Joplin",
          "MO",
          64804,
          callback
        );
      },
      function (callback) {
        customerCreate(
          "John",
          "Wayne Jr.",
          4174174141,
          "johnwaynejr@gmail.com",
          "2424 W. 8th St,",
          "",
          "Joplin",
          "MO",
          64804,
          callback
        );
      },
      function (callback) {
        jobTypeCreate("New", callback);
      },
      function (callback) {
        jobTypeCreate("Refreshen", callback);
      },
      function (callback) {
        jobTypeCreate("Repair", callback);
      },
      function (callback) {
        jobTypeCreate("Machine Work", callback);
      },
      function (callback) {
        jobTypeCreate("In-Out", callback);
      },
      function (callback) {
        jobTypeCreate("Walk-In", callback);
      },
      function (callback) {
        laborCreate("Cylinder Hone", 100, callback);
      },
      function (callback) {
        laborCreate("Cylinder Hone -w Deck Plate", 200, callback);
      },
      function (callback) {
        laborCreate("Valve Job 8 Cylinder", 350, callback);
      },
      function (callback) {
        laborCreate("Bore 8 Cylinder", 350, callback);
      },
      function (callback) {
        laborCreate("Deck 8 Cylinder", 350, callback);
      },
      function (callback) {
        laborCreate("Assemble 8 Cylinder", 800, callback);
      },
      function (callback) {
        laborCreate("Refreshen USRA B-Mod", 3200, callback);
      },
      function (callback) {
        vendorCreate(
          "Manley Performance Proudcts",
          "Neil Vernarelli",
          "732905336",
          "sales@manleyperformance.com",
          "1960 Swarthmore Avenue",
          "",
          "Lakewood",
          "NJ",
          08701,
          "2484595",
          callback
        );
      },
      function (callback) {
        vendorCreate(
          "Engine Parts Warehouse",
          "Don Lee",
          8006255900,
          "sales@epw.com",
          "7301 Global Dr",
          "",
          "Louisville",
          "KY",
          40258,
          "785267",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createParts(cb) {
  async.parallel(
    [
      function (callback) {
        partsCreate(
          "3/8 8740 rod bolts",
          350,
          250,
          "75782",
          vendors[1],
          "Scat",
          callback
        );
      },
      function (callback) {
        partsCreate(
          "Oil Filter 51061R",
          35,
          25,
          "51061R",
          vendors[1],
          "Wix",
          callback
        );
      },
      function (callback) {
        partsCreate(
          "USRA B-Mod Intake Valve",
          250,
          150,
          "73597-In",
          vendors[0],
          "Manley",
          callback
        );
      },
      function (callback) {
        partsCreate(
          "USRA B-Mod Exhaust Valve",
          350,
          250,
          "73597-Ex",
          vendors[0],
          "Manley",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createWorkOrders(cb) {
  async.parallel(
    [
      function (callback) {
        workOrderCreate(
          customers[0],
          "2022-9-1",
          "2023-1-1",
          3600,
          false,
          jobTypes[1],
          ["water pump", "distributor"],
          [parts[0], parts[1], parts[2], parts[3]],
          "",
          "Standard B-Mod refreshen. Customer requested new intake and exhaust valves.",
          7391,
          callback
        );
      },
      function (callback) {
        workOrderCreate(
          customers[1],
          "2022-9-1",
          "2023-1-1",
          3600,
          false,
          jobTypes[1],
          ["water pump", "distributor"],
          [parts[0], parts[1], parts[2], parts[3]],
          "",
          "Standard B-Mod refreshen. Customer requested new intake and exhaust valves.",
          7391,
          callback
        );
      },
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createParts, createWorkOrders],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
      console.log(err);
    } else {
      console.log("Work orders: ");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
