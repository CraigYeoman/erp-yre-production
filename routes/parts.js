const express = require("express");
const router = express.Router();

const {
  getAllParts,
  getAllPartsStatic,
  part_detail,
  parts_create_get,
  parts_create_post,
  part_delete_get,
  part_delete_post,
  part_edit_post,
} = require("../controllers/partsController");

// GET request for creating a Part.
router.route("/create").get(parts_create_get);
// POST request for creating Part.
router.route("/create").post(parts_create_post);
// GET request to delete Part.
router.route("/:id/delete").get(part_delete_get);
// POST request to delete Part.
router.route("/:id/delete").post(part_delete_post);
// GET request to update Part.
// POST request to update Part.
router.route("/:id/edit").post(part_edit_post);
// GET request for one Part.
router.route("/:id").get(part_detail);
// GET request for list of all Part items.
router.route("/").get(getAllParts);
router.route("/static").get(getAllPartsStatic);

module.exports = router;
