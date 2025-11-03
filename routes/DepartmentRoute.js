// import express from "express";
// import Departments from "../models/Departments.js"
// import auth from "../auth/Middleware.js";
// import multer from "multer";

const express = require("express");
const Departments = require("../models/Departments");
const auth = require("../auth/Middleware");
const multer = require("multer");
const router = express.Router();

// multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const uploads = multer({ storage: storage });

// create a new department
router.post(
  "/addDepartment",
  auth("admin"),
  uploads.single("image"),
  async (req, res) => {
    try {
      const { name, destination } = req.body;
      const image = req.file ? req.file.path : null;
      const newDepartment = new Departments({
        name,
        destination,
        image,
      });
      await newDepartment.save();
      res.status(201).json({
        message: "Department created successfully",
        Departments: newDepartment,
      });
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err.message });
    }
  }
);

module.exports = router;
