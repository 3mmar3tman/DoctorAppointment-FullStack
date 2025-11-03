const express = require("express");
const Doctor = require("../models/DoctorSchema");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const upload = multer({ storage: storage });

router.post("/addDoctors", upload.single("image"), async (req, res) => {
  try {
    const { name, specialty, description, experienceYears } = req.body;

    const image = req.file ? req.file.filename : null;
    if (!name || !specialty || !description || !experienceYears || !image)
      return res.status(400).json({ message: "all Fields are required" });

    const newDoctor = new Doctor({
      name,
      specialty,
      description,
      experienceYears,
      image: req.file?.filename,
    });

    const savedDoctors = await newDoctor.save();

    res.status(201).json(savedDoctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});
router.get("/getDoctors", async (req, res) => {
  const doctors = await Doctor.find();
  res.status(200).json(doctors);
});
router.get("/getDoctor/:id", async (req, res) => {
  const doctorId = req.params.id;
  //   const doctor = await Doctor.findById(doctorId);
  //   res.status(200).json(doctor);
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
