import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/vedaz.css";

export default function BookingModal({ expertId, onClose }) {
  const [form, setForm] = useState({
    date: "",
    timeSlot: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔥 DEBUG — IMPORTANT
  useEffect(() => {
    console.log("🧠 Modal received expertId:", expertId);
  }, [expertId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      // 🚨 HARD GUARD
      if (!expertId) {
        setError("Expert not found. Please refresh.");
        return;
      }

      console.log("🚀 Creating booking for expert:", expertId);

      const res = await api.post("/bookings", {
        expertId,
        ...form,
      });

      console.log("✅ Booking created:", res.data);

      setSuccess("Booking requested successfully!");

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      console.error("❌ Booking failed:", err);
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Book Session</h3>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <input name="date" type="date" onChange={handleChange} value={form.date} />
        <input name="timeSlot" placeholder="Time Slot (e.g., 10:00 AM)" onChange={handleChange} value={form.timeSlot} />
        <input name="name" placeholder="Your Name" onChange={handleChange} value={form.name} />
        <input name="email" placeholder="Email" onChange={handleChange} value={form.email} />
        <input name="phone" placeholder="Phone" onChange={handleChange} value={form.phone} />
        <textarea name="notes" placeholder="Notes (optional)" onChange={handleChange} value={form.notes} />

        <div className="modal-actions">
          <button className="cancel-btn" type="button" onClick={onClose}>
            Cancel
          </button>

          <button className="confirm-btn" type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}