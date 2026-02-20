import express from "express";
import {
  createBooking,
  getExpertBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { protect, expertOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* customer creates */
router.post("/", protect, createBooking);

/* expert dashboard */
router.get("/expert", protect, expertOnly, getExpertBookings);

/* expert action */
router.patch("/:id/status", protect, expertOnly, updateBookingStatus);

export default router;