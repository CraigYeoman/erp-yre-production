const express = require("express");
const router = express.Router();

const {
  customer_create_post,
  getAllCustomersStatic,
  getAllCustomers,
  customer_detail,
  customer_delete_get,
  customer_delete_post,
  customer_edit_post,
} = require("../controllers/customerController");

// POST request for creating Customer.
router.route("/create").post(customer_create_post);
// GET request to delete Customer.
router.route("/:id/delete").get(customer_delete_get);
// POST request to delete Customer.
router.route("/:id/delete").post(customer_delete_post);
// POST request to update Customer.
router.route("/:id/edit").post(customer_edit_post);
// GET request for one Customer.
router.route("/:id").get(customer_detail);
// GET request for list of all Customer items.
router.route("/").get(getAllCustomers);
router.route("/static").get(getAllCustomersStatic);

module.exports = router;
