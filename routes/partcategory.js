const express = require("express");
const router = express.Router();

const {
  getAllpartCategoriesStatic,
  getAllpartCategories,
  part_category_detail,
  part_category_create_post,
  part_category_delete_get,
  part_category_delete_post,
  part_category_edit_post,
} = require("../controllers/partCategoryController");

// POST request for creating Job Type.
router.route("/create").post(part_category_create_post);
// GET request to delete Job Type.
router.route("/:id/delete").get(part_category_delete_get);
// POST request to delete Job Type.
router.route("/:id/delete").post(part_category_delete_post);
// GET request to update Job Type.
// POST request to update Job Type.
router.route("/:id/edit").post(part_category_edit_post);
// GET request for one Job Type.
router.route("/:id").get(part_category_detail);
// GET request for list of all Job Type items.
router.route("/").get(getAllpartCategories);
router.route("/static").get(getAllpartCategoriesStatic);

module.exports = router;
