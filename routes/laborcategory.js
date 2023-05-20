const express = require("express");
const router = express.Router();

const {
  getAlllaborCategoriesStatic,
  getAlllaborCategories,
  labor_category_detail,
  labor_category_create_post,
  labor_category_delete_get,
  labor_category_delete_post,
  labor_category_edit_post,
} = require("../controllers/laborCategoryController");

// POST request for creating Job Type.
router.route("/create").post(labor_category_create_post);
// GET request to delete Job Type.
router.route("/:id/delete").get(labor_category_delete_get);
// POST request to delete Job Type.
router.route("/:id/delete").post(labor_category_delete_post);
// GET request to update Job Type.
// POST request to update Job Type.
router.route("/:id/edit").post(labor_category_edit_post);
// GET request for one Job Type.
router.route("/:id").get(labor_category_detail);
// GET request for list of all Job Type items.
router.route("/").get(getAlllaborCategories);
router.route("/static").get(getAlllaborCategoriesStatic);

module.exports = router;
