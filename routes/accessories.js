const express = require("express");
const router = express.Router();

const {
  accessories_create_post,
  getAllAccessoriesStatic,
  getAllAccessories,
  accessories_detail,
} = require("../controllers/accessoriesController");

// POST request for creating Accessories.
router.route("/create").post(accessories_create_post);
// GET request for one Accessories.
router.route("/:id").get(accessories_detail);
// GET request for list of all accessories items.
router.route("/").get(getAllAccessories);
router.route("/static").get(getAllAccessoriesStatic);

module.exports = router;
