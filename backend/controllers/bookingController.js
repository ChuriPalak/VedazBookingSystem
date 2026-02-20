import Booking from "../models/Booking.js";
import Expert from "../expert/Expert.js";

/* ================= CREATE BOOKING ================= */

export const createBooking = async (req, res) => {
  try {
    const {
      expertId,
      date,
      timeSlot,
      name,
      email,
      phone,
      notes,
    } = req.body;

    const booking = await Booking.create({
      expertId,
      customerId: req.user._id,
      date,
      timeSlot,
      name,
      email,
      phone,
      notes,
    });

    res.status(201).json(booking);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Slot already booked",
      });
    }
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= EXPERT BOOKINGS ================= */

export const getExpertBookings = async (req, res) => {
  try {
    const expert = await Expert.findOne({ userId: req.user._id });

    const bookings = await Booking.find({
      expertId: expert._id,
    })
      .populate("customerId", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE STATUS ================= */

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};