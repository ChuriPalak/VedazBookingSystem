import { useState } from "react";

export default function BookingModal({ isOpen, onClose, expert }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Booking data:", form);

    // 🔥 later we will call backend here

    onClose(); // close modal
  };

  return (
    <div className="modal-overlay">
      <div className="booking-modal">
        <h2>Book Consultation</h2>

        {/* Date */}
        <label>Select Date</label>
        <input type="date" name="date" onChange={handleChange} />

        {/* Time */}
        <label>Select Time</label>
        <select name="time" onChange={handleChange}>
          <option value="">Choose time</option>
          <option>10:00 AM</option>
          <option>11:00 AM</option>
          <option>2:00 PM</option>
          <option>4:00 PM</option>
        </select>

        {/* Name */}
        <label>Your Name</label>
        <input name="name" onChange={handleChange} />

        {/* Phone */}
        <label>Phone Number</label>
        <input name="phone" onChange={handleChange} />

        {/* Email */}
        <label>Email</label>
        <input name="email" onChange={handleChange} />

        {/* Notes */}
        <label>Notes (optional)</label>
        <textarea name="notes" onChange={handleChange} />

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="confirm-btn" onClick={handleSubmit}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}