const { body, validationResult } = require("express-validator");
const Labor = require("../models/labor");
const async = require("async");
const WorkOrder = require("../models/workOrder");
const Category = require("../models/laborCategory");

// Display list of all labor.
const getAllLaborStatic = async (req, res) => {
  const labors = await Labor.find().sort("name");
  res.status(200).json({ labors, nbHits: labors.length });
};

const getAllLabor = async (req, res) => {
  const { name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = "price";
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Labor.find(queryObject).populate("laborCategory");
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
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const labor = await result;
  res.status(200).json({ labor, nbHits: labor.length });
};

// Display labor page for a specific Labor.
const labor_detail = (req, res, next) => {
  Labor.findById(req.params.id)
    .populate("laborCategory")
    .exec(function (err, results) {
      if (err) {
        // Error in API usage.
        return next(err);
      }
      if (results == null) {
        // No results.
        const err = new Error("Labor not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.status(200).json({
        labor_detail: results,
      });
    });
};

// Display Labor create form on GET
const labor_create_get = (req, res, next) => {
  Category.find().exec(function (err, results) {
    if (err) {
      // Error in API usage.
      return next(err);
    }
    if (results == null) {
      // No results.
      const err = new Error("Labor not found");
      err.status = 404;
      return next(err);
    }
    // Successful, so render.
    res.status(200).json({
      labor_category_list: results,
    });
  });
};

// Handle Labor create on POST.

const labor_create_post = [
  // Validate and sanitize the name field.
  body("name", "Labor name required").trim().isLength({ min: 1 }).escape(),
  body("price", "Labor price required").trim().isLength({ min: 1 }).escape(),
  body("laborCategory").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a labor object with escaped and trimmed data.
    const labor = new Labor({
      name: req.body.name,
      price: req.body.price,
      laborCategory: req.body.laborCategory,
    });
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.json({
        labor,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Labor with same name already exists.
      Labor.findOne({ name: req.body.name }).exec((err, found_labor) => {
        if (err) {
          return next(err);
        }

        if (found_labor) {
          // Labor exists, redirect to its detail page.
          res.redirect(found_labor.url);
        } else {
          labor.save((err) => {
            if (err) {
              return next(err);
            }
            // Labor saved.
            res.status(200).json({
              msg: "Labor created",
              labor: labor,
            });
          });
        }
      });
    }
  },
];

// Handle Labor delete on GET.
const labor_delete_get = (req, res, next) => {
  async.parallel(
    {
      labor(callback) {
        Labor.findById(req.params.id).exec(callback);
      },
      labor_work_orders(callback) {
        WorkOrder.find({ labor: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Success
      if (results.labor_work_orders.length > 0) {
        // Labor has work orders. Render in same way as for GET route.
        res.status(200).json({
          labor: results.labor,
          labor_work_orders: results.labor_work_orders,
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

// Handle Labor delete on POST.
const labor_delete_post = (req, res, next) => {
  // Labor has no work orders. Delete object and redirect to the list of labors.
  Labor.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    // Success - go to labor list
    res.status(200).json({
      msg: "Complete",
    });
  });
};

// Handle Labor edit on POST.
const labor_edit_post = [
  // Validate and sanitize the name field.
  body("name", "Labor name required").trim().isLength({ min: 1 }).escape(),
  body("price", "Labor price required").trim().isLength({ min: 1 }).escape(),
  body("laborCategory").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.json({
        labor,
        errors: errors.array(),
      });
      return;
    }

    // Create a labor object with escaped and trimmed data.
    const labor = new Labor({
      name: req.body.name,
      price: req.body.price,
      laborCategory: req.body.laborCategory,
      _id: req.params.id,
    });

    Labor.findByIdAndUpdate(req.params.id, labor, {}, (err, updatedLabor) => {
      if (err) {
        return next(err);
      }
      async.parallel(
        {
          categoryLabor(callback) {
            Category.findById(labor.laborCategory).exec(callback);
          },
          categoryUpdatedLabor(callback) {
            Category.findById(updatedLabor.laborCategory).exec(callback);
          },
        },
        (err, results) => {
          if (err) {
            return next(err);
          }
          // Success

          labor.laborCategory = results.categoryLabor;
          updatedLabor.laborCategory = results.categoryUpdatedLabor;
          res.status(200).json({
            msg: "labor edited",
            labor: labor,
            updatedLabor: updatedLabor,
          });
        }
      );
      // jobtype saved.
    });
  },
];

module.exports = {
  getAllLaborStatic,
  getAllLabor,
  labor_detail,
  labor_create_post,
  labor_delete_post,
  labor_create_get,
  labor_delete_get,
  labor_edit_post,
};
