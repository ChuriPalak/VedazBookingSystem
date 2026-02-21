import Booking from "../models/Booking.js";
import Expert from "../expert/Expert.js";
import { getIO } from "../socket/socket.js";

/* ================= CREATE BOOKING ================= */

export const createBooking = async (req, res) => {
  try {
    const { expertId, date, timeSlot, name, email, phone, notes } = req.body;

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

    // 🔥 realtime emit to expert room
    const io = getIO();
    if (io) {
      io.to(expertId.toString()).emit("new-booking", booking);
    }

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
    console.log("🔥 Logged in user:", req.user._id);

    const expert = await Expert.findOne({ userId: req.user._id });

    console.log("🔥 Found expert:", expert?._id);

    if (!expert) {
      return res.status(404).json({
        message: "Expert profile not found for this user",
      });
    }

    const bookings = await Booking.find({
      expertId: expert._id,
    })
      .populate("customerId", "name email")
      .sort({ createdAt: -1 });

    console.log("🔥 Bookings found:", bookings.length);

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

    /* 🔥🔥🔥 REALTIME EMIT TO CUSTOMER */

    const io = getIO();

    if (io && booking) {
      console.log(
        "📡 Emitting to customer:",
        booking.customerId.toString()
      );

      io.to(booking.customerId.toString()).emit(
        "booking-status-updated",
        booking
      );
    }

    res.json(booking);
  } catch (err) {
    console.error("Status update failed:", err);
    res.status(500).json({ message: "Status update failed" });
  }
};