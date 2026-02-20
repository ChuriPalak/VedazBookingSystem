import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "../styles/vedaz.css";

export default function ExpertDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  /* ================= FETCH ================= */

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/bookings/expert");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ================= SOCKET ================= */

  useEffect(() => {
    const socket = io("http://localhost:5000");

    const user = JSON.parse(localStorage.getItem("user"));
    socket.emit("join-expert", user._id);

    socket.on("new-booking", (booking) => {
      setBookings((prev) => [booking, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  /* ================= STATUS UPDATE ================= */

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= FILTER ================= */

  const filteredBookings =
    statusFilter === "All"
      ? bookings
      : bookings.filter((b) => b.status === statusFilter);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>Expert Dashboard</h2>

        {/* 🔥 FILTER */}
        <div className="status-filter">
          {["All", "Pending", "Confirmed", "Cancelled", "Completed"].map(
            (s) => (
              <button
                key={s}
                className={statusFilter === s ? "active-filter" : ""}
                onClick={() => setStatusFilter(s)}
              >
                {s}
              </button>
            )
          )}
        </div>

        {loading ? (
          <p>Loading bookings...</p>
        ) : filteredBookings.length === 0 ? (
          <p>No booking requests yet</p>
        ) : (
          <div className="requests-table">
            {filteredBookings.map((b) => (
              <div key={b._id} className="table-row">
                <span>{b.customerId?.name || "User"}</span>
                <span>{b.date}</span>
                <span>{b.timeSlot}</span>
                <span>{b.status}</span>

                {b.status === "Pending" && (
                  <div>
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
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}