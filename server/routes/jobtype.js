const express = require("express");
const router = express.Router();

const {
  getAllJobTypesStatic,
  getAllJobTypes,
  job_type_detail,
  jobtype_create_post,
  job_type_delete_get,
  job_type_delete_post,
  job_type_edit_post,
} = require("../controllers/jobTypeController");

// POST request for creating Job Type.
router.route("/create").post(jobtype_create_post);
// GET request to delete Job Type.
router.route("/:id/delete").get(job_type_delete_get);
// POST request to delete Job Type.
router.route("/:id/delete").post(job_type_delete_post);
// GET request to update Job Type.
// POST request to update Job Type.
router.route("/:id/edit").post(job_type_edit_post);
// GET request for one Job Type.
router.route("/:id").get(job_type_detail);
// GET request for list of all Job Type items.
router.route("/").get(getAllJobTypes);
router.route("/static").get(getAllJobTypesStatic);

module.exports = router;
