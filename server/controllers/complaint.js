const Complaint = require("../models/complaint");
const User = require("../models/user");
const Category = require("../models/category");

exports.createComplaint = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({
        status: "error",
        message: "Title is required",
      });
    }
    if (!req.body.description) {
      return res.status(400).json({
        status: "error",
        message: "Description is required",
      });
    }
    const category = await Category.find({ value: req.body.category });
    const complaint = await Complaint.create(req.body);
    const user = await User.findById(req.user.id);
    complaint.category = category[0]._id;
    user.complaints.push(complaint._id);
    await user.save();
    res.status(201).json({
      status: "success",
      message: "Complaint created successfully",
      data: complaint,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await User.findById(req.user.id).populate("complaints");
    if (!complaints) {
      return res.status(404).json({
        status: "error",
        message: "No complaints found. Please create one",
      });
    }
    res.status(200).json({
      status: "success",
      data: complaints.complaints,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!complaint) {
      return res.status(404).json({
        status: "error",
        message: "Complaint not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Complaint updated successfully",
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        status: "error",
        message: "Complaint not found",
      });
    }

    const user = await User.findById(req.user.id);
    user.complaints.indexOf(req.params.id);
    user.complaints.splice(user.complaints.indexOf(req.params.id), 1);
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Complaint deleted successfully",
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getIndividualComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        status: "error",
        message: "Complaint not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//sending complaind based on status
exports.getComplaintsByStatus = async (req, res) => {
  try {
    const pendingComplaints = await Complaint.countDocuments({
      status: "Pending",
    });
    const resolvedComplaints = await Complaint.countDocuments({
      status: "Resolved",
    });
    const inProgressComplaints = await Complaint.countDocuments({
      status: "In Progress",
    });
    res.status(200).json({
      status: "success",
      data: {
        pending: pendingComplaints,
        resolved: resolvedComplaints,
        inProgress: inProgressComplaints,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.manageComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({});
    res.status(200).json({
      status: "success",
      data: {
        complaints,
      },
      message: "Complaints fetched Successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
