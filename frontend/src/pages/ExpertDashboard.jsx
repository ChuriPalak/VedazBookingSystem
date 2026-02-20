import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "../styles/vedaz.css";

export default function ExpertDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH BOOKINGS ================= */

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/bookings/expert");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/bookings/${id}/status`, { status });
      fetchBookings(); // refresh
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>Expert Dashboard</h2>

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No booking requests yet</p>
        ) : (
          <div className="requests-table">
            <div className="table-header">
              <span>Customer</span>
              <span>Date</span>
              <span>Time</span>
              <span>Notes</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            {bookings.map((b) => (
              <div key={b._id} className="table-row">
                <span>{b.customerId?.name || "User"}</span>
                <span>{b.date}</span>
                <span>{b.timeSlot}</span>
                <span>{b.notes || "-"}</span>

                <span
                  className={
                    b.status === "Confirmed"
                      ? "confirmed"
                      : b.status === "Cancelled"
                      ? "cancelled"
                      : "pending"
                  }
                >
                  {b.status}
                </span>

                <div className="action-buttons">
                  {b.status === "Pending" && (
                    <>
                      <button
                        className="confirm-btn small"
                        onClick={() =>
                          updateStatus(b._id, "Confirmed")
                        }
                      >
                        Confirm
                      </button>

                      <button
                        className="cancel-btn small"
                        onClick={() =>
                          updateStatus(b._id, "Cancelled")
                        }
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}