const { body, validationResult } = require("express-validator");
const LaborCategory = require("../models/laborCategory");
const async = require("async");

// Display list of all Labor Categorys.
const getAlllaborCategoriesStatic = async (req, res) => {
  const laborCategories = await LaborCategory.find().sort("type");
  res.status(200).json({ laborCategories, nbHits: laborCategories.length });
};

const getAlllaborCategories = async (req, res) => {
  const { name, sort, fields } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = LaborCategory.find(queryObject);
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

  const laborCategories = await result;
  res.status(200).json({ laborCategories, nbHits: laborCategories.length });
};

const labor_category_detail = (req, res, next) => {
  LaborCategory.findById(req.params.id).exec(function (err, results) {
    if (err) {
      // Error in API usage.
      return next(err);
    }
    if (results == null) {
      // No results.
      const err = new Error("Labor Category not found");
      err.status = 404;
      return next(err);
    }
    // Successful, so render.
    res.status(200).json({
      labor_category_detail: results,
    });
  });
};

const labor_category_create_post = [
  // Validate and sanitize fields.
  body("name", "Category name required").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(500).json({
        laborcategory: req.body,
        errors: errors.array(),
      });

      return;
    }
    // Create a labor category object with escaped and trimmed data.
    const laborcategory = new LaborCategory({
      name: req.body.name,
    });

    laborcategory.save((err) => {
      if (err) {
        return next(err);
      }
      // labor category saved.
      res.status(200).json({
        msg: "Labor Category created",
        laborcategory: laborcategory,
      });
    });
  },
];

// Handle Labor Category delete on GET.
const labor_category_delete_get = (req, res, next) => {
  async.parallel(
    {
      laborCategory(callback) {
        LaborCategory.findById(req.params.id).exec(callback);
      },
    },
    (err) => {
      if (err) {
        return next(err);
      } else {
        res.status(200).json({
          msg: "Are you sure you want to delete?",
        });
      }
    }
  );
};

// Handle Labor Category delete on POST.
const labor_category_delete_post = (req, res, next) => {
  LaborCategory.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    // Success - go to author list
    res.status(200).json({
      msg: "Complete",
    });
  });
};

// Handle labor Category edit on POST
const labor_category_edit_post = [
  // Validate and sanitize fields.
  body("name", "Labor Category name required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(500).json({
        laborcategory: req.body,
        errors: errors.array(),
      });

      return;
    }
    // Create a Labor category object with escaped and trimmed data.
    const laborcategory = new LaborCategory({
      name: req.body.name,
      _id: req.params.id,
    });

    LaborCategory.findByIdAndUpdate(
      req.params.id,
      laborcategory,
      {},
      (err, updatedLaborCategory) => {
        if (err) {
          return next(err);
        }
        // laborcategory saved.
        res.status(200).json({
          msg: "Labor category edited",
          laborcategory: laborcategory,
          updatedLaborCategory: updatedLaborCategory,
        });
      }
    );
  },
];

module.exports = {
  getAlllaborCategoriesStatic,
  getAlllaborCategories,
  labor_category_detail,
  labor_category_create_post,
  labor_category_delete_get,
  labor_category_delete_post,
  labor_category_edit_post,
};
