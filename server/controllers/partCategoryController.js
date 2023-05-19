const { body, validationResult } = require("express-validator");
const PartCategory = require("../models/partCategory");
const async = require("async");

// Display list of all Part Categorys.
const getAllpartCategoriesStatic = async (req, res) => {
  const partCategories = await PartCategory.find().sort("type");
  res.status(200).json({ partCategories, nbHits: partCategories.length });
};

const getAllpartCategories = async (req, res) => {
  const { name, sort, fields } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = PartCategory.find(queryObject);
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

  const partCategories = await result;
  res.status(200).json({ partCategories, nbHits: partCategories.length });
};

const part_category_detail = (req, res, next) => {
  PartCategory.findById(req.params.id).exec(function (err, results) {
    if (err) {
      // Error in API usage.
      return next(err);
    }
    if (results == null) {
      // No results.
      const err = new Error("Part Category not found");
      err.status = 404;
      return next(err);
    }
    // Successful, so render.
    res.status(200).json({
      part_category_detail: results,
    });
  });
};

const part_category_create_post = [
  // Validate and sanitize fields.
  body("name", "Category name required").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(500).json({
        partcategory: req.body,
        errors: errors.array(),
      });

      return;
    }
    // Create a part category object with escaped and trimmed data.
    const partcategory = new PartCategory({
      name: req.body.name,
    });

    partcategory.save((err) => {
      if (err) {
        return next(err);
      }
      // part category saved.
      res.status(200).json({
        msg: "Part Category created",
        partcategory: partcategory,
      });
    });
  },
];

// Handle Part Category delete on GET.
const part_category_delete_get = (req, res, next) => {
  async.parallel(
    {
      partCategory(callback) {
        PartCategory.findById(req.params.id).exec(callback);
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

// Handle Part Category delete on POST.
const part_category_delete_post = (req, res, next) => {
  PartCategory.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    // Success - go to author list
    res.status(200).json({
      msg: "Complete",
    });
  });
};

// Handle Part Category edit on POST
const part_category_edit_post = [
  // Validate and sanitize fields.
  body("name", "Part Category name required")
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
        partcategory: req.body,
        errors: errors.array(),
      });

      return;
    }
    // Create a part category object with escaped and trimmed data.
    const partcategory = new PartCategory({
      name: req.body.name,
      _id: req.params.id,
    });

    PartCategory.findByIdAndUpdate(
      req.params.id,
      partcategory,
      {},
      (err, updatedPartCategory) => {
        if (err) {
          return next(err);
        }
        // partcategory saved.
        res.status(200).json({
          msg: "Part category edited",
          partcategory: partcategory,
          updatedPartCategory: updatedPartCategory,
        });
      }
    );
  },
];

module.exports = {
  getAllpartCategoriesStatic,
  getAllpartCategories,
  part_category_detail,
  part_category_create_post,
  part_category_delete_get,
  part_category_delete_post,
  part_category_edit_post,
};
