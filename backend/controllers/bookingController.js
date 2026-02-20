import Booking from "../models/Booking.js";
import { getIO } from "../socket/socket.js";
import Expert from "../expert/Expert.js";


/* ================= CREATE BOOKING ================= */

export const createBooking = async (req, res) => {
  try {
    const { expertId, date, timeSlot, name, email, phone, notes } = req.body;

    const booking = await Booking.create({
      expertId,
      customerId: req.user.id,
      date,
      timeSlot,
      name,
      email,
      phone,
      notes,
    });

    /* 🔥 REALTIME EMIT */
    const io = getIO();
    io.to(expertId.toString()).emit("new-booking", booking);

    res.status(201).json(booking);
  } catch (err) {
    console.error("Create booking error:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        message: "This time slot is already booked",
      });
    }

    res.status(500).json({ message: "Failed to create booking" });
  }
};

/* ================= EXPERT BOOKINGS ================= */



export const getExpertBookings = async (req, res) => {
  try {
    // ⭐ find expert profile linked to this user
    const expert = await Expert.findOne({ userId: req.user.id });

    if (!expert) {
      return res.status(404).json({ message: "Expert profile not found" });
    }

    const bookings = await Booking.find({
      expertId: expert._id,
    })
      .populate("customerId", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Expert bookings error:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
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
    res.status(500).json({ message: "Status update failed" });
  }
};