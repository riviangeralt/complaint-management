const User = require("../models/user");
const Complaint = require("../models/complaint");

exports.userProfile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).populate(
      "complaints"
    );
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          designation: req.body.designation,
          age: req.body.age,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
          phone: req.body.phone,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.user.id });
    const complaints = user.complaints;
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    for (let i = 0; i < complaints.length; i++) {
      const complaint = await Complaint.findOneAndDelete({
        _id: complaints[i],
      });
      if (!complaint) {
        return res.status(404).json({
          status: "error",
          message: "Complaint not found",
        });
      }
      res.clearCookie("jwt");
    }

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//this is for admin. who can see how many registered today, this week, this month,
exports.getUserCount = async (req, res) => {
  try {
    const today = new Date();
    const thisWeek = new Date();
    thisWeek.setDate(today.getDate() - 7);
    const thisMonth = new Date();
    thisMonth.setMonth(today.getMonth() - 1);
    const todayCount = await User.countDocuments({
      createdAt: {
        $gte: today.toISOString().split("T")[0],
      },
    });
    const thisWeekCount = await User.countDocuments({
      createdAt: {
        $gte: thisWeek.toISOString().split("T")[0],
      },
    });
    const thisMonthCount = await User.countDocuments({
      createdAt: {
        $gte: thisMonth.toISOString().split("T")[0],
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        todayCount,
        thisWeekCount,
        thisMonthCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.allUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      status: "success",
      message: "Users fetched successfully.",
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateProfileByAdmin = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          designation: req.body.designation,
          age: req.body.age,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
          phone: req.body.phone,
          role: req.body.role,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
