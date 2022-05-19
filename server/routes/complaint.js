const express = require("express");
const router = express.Router();
const { isAuth } = require("../controllers/auth.js");
const {
  createComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint,
  getIndividualComplaint,
  getComplaintsByStatus,
  manageComplaints,
} = require("../controllers/complaint.js");
const { isAdmin } = require("../controllers/auth.js");

router.route("/create").post(isAuth, createComplaint);
router
  .route("/complaint/:id")
  .put(isAuth, updateComplaint)
  .delete(isAuth, deleteComplaint)
  .get(isAuth, getIndividualComplaint);
router.route("/complaint").get(isAuth, getComplaints);

//admin routes
router.route("/status").get(isAuth, isAdmin, getComplaintsByStatus);
router.route("/manage").get(isAuth, isAdmin, manageComplaints);

module.exports = router;
