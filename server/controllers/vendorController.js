const { body, validationResult } = require("express-validator");
const Vendor = require("../models/vendor");
const Parts = require("../models/parts");
const async = require("async");

// Display list of all Vendors.
const getAllVendorsStatic = async (req, res) => {
  const vendors = await Vendor.find().sort("name").select("name main_contact");
  res.status(200).json({ vendors, nbHits: vendors.length });
};

const getAllVendors = async (req, res) => {
  const { name, main_contact, sort, fields } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (main_contact) {
    queryObject.main_contact = { $regex: main_contact, $options: "i" };
  }

  let result = Vendor.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("name");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const vendors = await result;
  res.status(200).json({ vendors, nbHits: vendors.length });
};
// Display detail page for a specific Vendor.
const vendor_detail = (req, res, next) => {
  async.parallel(
    {
      vendor(callback) {
        Vendor.findById(req.params.id).exec(callback);
      },
      vendor_parts(callback) {
        Vendor.findById(req.params.id).exec(callback);
      },
      vendor_parts(callback) {
        Parts.find({ vendor: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        // Error in API usage.
        return next(err);
      }
      if (results.vendor == null) {
        // No results.
        const err = new Error("vendor not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.status(200).json({
        vendor: results.vendor,
        vendor_parts: results.vendor_parts,
      });
    }
  );
};

const vendor_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Company name must be specified."),
  body("main_contact")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Main contact must be specified."),
  body("phone_number", "Invalid phone number").isLength({ min: 10 }),
  body("email", "Invalid email").isEmail(),
  body("address_line_1", "Invalid address").isLength({ min: 1 }).trim(),
  body("address_line_2", "Invalid address").trim(),
  body("city", "Invalid city").isLength({ min: 1 }).trim(),
  body("state", "Invalid state initials").isLength({ min: 2 }),
  body("zip_code", "Invalid zipcode").isLength({ min: 5 }),
  body("customer_number", "Invalid customer number.").isLength({ min: 1 }),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(500).json({
        vendor: req.body,
        errors: errors.array(),
      });

      return;
    }
    // Create a Vendor object with escaped and trimmed data.
    const vendor = new Vendor({
      name: req.body.name,
      main_contact: req.body.main_contact,
      phone_number: req.body.phone_number,
      email: req.body.email,
      address_line_1: req.body.address_line_1,
      address_line_2: req.body.address_line_2,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code,
      customer_number: req.body.customer_number,
    });

    vendor.save((err) => {
      if (err) {
        return next(err);
      }
      // Vendor saved.
      res.status(200).json({
        msg: "Vendor created",
        vendor: vendor,
      });
    });
  },
];

// Handle Vendor delete on GET.
const vendor_delete_get = (req, res, next) => {
  async.parallel(
    {
      vendor(callback) {
        Vendor.findById(req.params.id).exec(callback);
      },
      vendor_parts(callback) {
        Parts.find({ vendor: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Success
      if (results.vendor_parts.length > 0) {
        // Vendor has work orders. Render in same way as for GET route.
        res.status(200).json({
          Vendor: results.vendor,
          vendor_parts: results.vendor_parts,
        });
        return;
      } else {
        res.status(200).json({
          msg: "Are you sure you want to delete?",
        });
      }
    }
  );
};

// Handle Vendor delete on POST.
const vendor_delete_post = (req, res, next) => {
  Vendor.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    // Success
    res.status(200).json({
      msg: "Complete",
    });
  });
};

// Handle Vendor Create on POST.
const vendor_edit_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Company name must be specified."),
  body("main_contact")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Main contact must be specified."),
  body("phone_number", "Invalid phone number").isLength({ min: 10 }),
  body("email", "Invalid email").isEmail(),
  body("address_line_1", "Invalid address").isLength({ min: 1 }).trim(),
  body("address_line_2", "Invalid address").trim(),
  body("city", "Invalid city").isLength({ min: 1 }).trim(),
  body("state", "Invalid state initials").isLength({ min: 2 }),
  body("zip_code", "Invalid zipcode").isLength({ min: 5 }),
  body("customer_number", "Invalid customer number.").isLength({ min: 1 }),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(500).json({
        vendor: req.body,
        errors: errors.array(),
      });

      return;
    }
    // Create a Vendor object with escaped and trimmed data.
    const vendor = new Vendor({
      name: req.body.name,
      main_contact: req.body.main_contact,
      phone_number: req.body.phone_number,
      email: req.body.email,
      address_line_1: req.body.address_line_1,
      address_line_2: req.body.address_line_2,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code,
      customer_number: req.body.customer_number,
      _id: req.params.id,
    });

    Vendor.findByIdAndUpdate(
      req.params.id,
      vendor,
      {},
      (err, updatedVendor) => {
        if (err) {
          return next(err);
        }
        // vendor saved.
        res.status(200).json({
          msg: "vendor edited",
          vendor: vendor,
          updatedVendor: updatedVendor,
        });
      }
    );
  },
];

module.exports = {
  getAllVendorsStatic,
  getAllVendors,
  vendor_detail,
  vendor_create_post,
  vendor_delete_get,
  vendor_delete_post,
  vendor_edit_post,
};
