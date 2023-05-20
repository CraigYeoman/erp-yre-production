const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getAllWorkOrders,
  getAllWorkOrdersStatic,
  work_order_create_get,
  work_order_create_post,
  work_order_detail,
  work_order_delete_get,
  work_order_delete_post,
  work_order_edit_get,
  work_order_edit_post,
  index,
} = require("../controllers/workOrderController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.route("/index").get(index);
// GET request for creating a work order.
router.route("/create").get(work_order_create_get);
// POST request for creating a work order.
router.route("/create").post(upload.array("images"), work_order_create_post);
// GET request to delete work order.
router.route("/:id/delete").get(work_order_delete_get);
// POST request to delete work order.
router.route("/:id/delete").post(work_order_delete_post);
// GET request to update work order.
router.route("/:id/edit").get(work_order_edit_get);
// POST request to update work order.
router.route("/:id/edit").post(upload.array("images"), work_order_edit_post);
// GET request for one work order.
router.route("/:id").get(work_order_detail);
// GET request for list of all work order
router.route("/").get(getAllWorkOrders);
router.route("/static").get(getAllWorkOrdersStatic);

module.exports = router;
