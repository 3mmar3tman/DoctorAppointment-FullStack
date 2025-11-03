const express = require("express");
const router = express.Router();
const Appointment = require("../models/AppointmentSchema");
const auth = require("../auth/Middleware");

router.post("/bookAppointment", auth(), async (req, res) => {
  try {
    const { doctor, date, reason } = req.body;

    if (!doctor || !date || !reason) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const appointment = await Appointment.create({
      user: req.user.id,
      doctor,
      date,
      reason,
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error("Book appointment error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getAppointments", auth(), async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id }).populate(
      "doctor"
    );
    res.json(appointments);
  } catch (error) {
    console.error("Get appointments error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/cancelAppointment/:id", auth(), async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting appointment with ID:", id);

    const appointment = await Appointment.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!appointment) {
      return res
        .status(404)
        .json({ error: "Appointment not found or not authorized" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
