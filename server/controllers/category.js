const Category = require("../models/category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ label: req.body.label });
    if (category) {
      return res.status(400).json({
        status: "error",
        message: "Category already exists",
      });
    }
    const categoryValue = await Category.findOne({ value: req.body.value });
    if (categoryValue) {
      return res.status(400).json({
        status: "error",
        message: "Category value already exists",
      });
    }
    if (!req.body.label || !req.body.value || !req.body.description) {
      return res.status(400).json({
        status: "error",
        message: "Please fill all the fields",
      });
    }
    const newCategory = await Category.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Category created successfully",
    });
  } catch (error) {
    res.send(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: category,
      message: "Category updated successfully",
    });
  } catch (error) {
    res.send(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "No categories found. Please add a category",
      });
    }
    res.status(200).json({
      status: "success",
      data: category,
      message: "Categories retrieved successfully",
    });
  } catch (error) {
    res.send(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: category,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.send(500).json({
      status: "error",
      message: error.message,
    });
  }
};
