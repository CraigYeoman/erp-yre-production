const express = require("express");
const router = express.Router();

const {
  getAllVendors,
  getAllVendorsStatic,
  vendor_detail,
  vendor_create_post,
  vendor_delete_get,
  vendor_delete_post,
  vendor_edit_post,
} = require("../controllers/vendorController");

// POST request for creating Vendor.
router.route("/create").post(vendor_create_post);
// GET request to delete Vendor.
router.route("/:id/delete").get(vendor_delete_get);
// POST request to delete Vendor.
router.route("/:id/delete").post(vendor_delete_post);
// GET request to update Vendor.
// POST request to update Vendor.
router.route("/:id/edit").post(vendor_edit_post);
// GET request for one Vendor.
router.route("/:id").get(vendor_detail);
// GET request for list of all Vendor items.
router.route("/").get(getAllVendors);
router.route("/static").get(getAllVendorsStatic);

module.exports = router;
