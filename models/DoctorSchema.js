const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  image: String,
  description: String,
  experienceYears: Number,
});

module.exports = mongoose.model("Doctor", DoctorSchema);
