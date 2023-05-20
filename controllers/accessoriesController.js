const { body, validationResult } = require("express-validator");
const Accessories = require("../models/accessories");
const async = require("async");

const getAllAccessoriesStatic = async (req, res) => {
  const accessories = await Accessories.find().sort("type");
  res.status(200).json({ accessories, nbHits: accessories.length });
};

const getAllAccessories = async (req, res) => {
  const { name, sort, fields } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = Accessories.find(queryObject);

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

  const accessories = await result;
  res.status(200).json({ accessories, nbHits: accessories.length });
};

const accessories_detail = (req, res, next) => {
  Accessories.findById(req.params.id).exec(function (err, results) {
    if (err) {
      // Error in API usage.
      return next(err);
    }
    if (results == null) {
      // No results.
      const err = new Error("accessories not found");
      err.status = 404;
      return next(err);
    }
    // Successful, so render.
    res.status(200).json({
      accessories_detail: results,
    });
  });
};

const accessories_create_post = [
  // Validate and sanitize fields.
  body("name", "accessories name required")
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
        accessories: req.body,
        errors: errors.array(),
      });

      return;
    }
    // Create a accessories object with escaped and trimmed data.
    const accessories = new Accessories({
      name: req.body.name,
    });

    accessories.save((err) => {
      if (err) {
        return next(err);
      }
      // accessories saved.
      res.status(200).json({
        msg: "accessory created",
        accessories: accessories,
      });
    });
  },
];

module.exports = {
  getAllAccessoriesStatic,
  getAllAccessories,
  accessories_detail,
  accessories_create_post,
};
