import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RecentExperts from "../components/RecentExperts";
import FilterSidebar from "../components/FilterSidebar";
import ExpertCard from "../components/ExpertCard";
import api from "../services/api";
import socket from "../socket"; // ⭐ IMPORTANT
import "../styles/vedaz.css";

const demoExperts = [
  {
    _id: "1",
    name: "Dr. Shalini",
    category: "Vedic Astrologer",
    experience: 12,
    rating: 4.8,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: "2",
    name: "Rajesh Kumar",
    category: "Tarot Reader",
    experience: 8,
    rating: 4.5,
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    _id: "3",
    name: "Meera Kapoor",
    category: "Palmistry Expert",
    experience: 10,
    rating: 4.7,
    image: "https://i.pravatar.cc/150?img=3",
  },
];

export default function ExpertsPage() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH EXPERTS ================= */

  const fetchExperts = async (filterParams = {}) => {
    try {
      setLoading(true);

      const query = new URLSearchParams(filterParams).toString();
      const res = await api.get(`/experts?${query}`);

      const data = res.data?.experts || res.data || [];

      setExperts(data.length ? data : demoExperts);
    } catch (err) {
      console.error("Error fetching experts", err);
      setExperts(demoExperts);
    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    fetchExperts();
  }, []);

  /* ================= 🔔 CUSTOMER SOCKET LISTENER ================= */

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // ✅ join customer room
    if (user?._id) {
      socket.emit("join-room", user._id);
      console.log("Customer joined room:", user._id);
    }

    // ✅ listen for expert confirmation
    socket.on("booking-status-updated", (booking) => {
      console.log("🔔 Booking update received:", booking);

      // simple alert (you can upgrade to toast later)
      alert(`Your booking is ${booking.status}`);
    });

    return () => {
      socket.off("booking-status-updated");
    };
  }, []);

  /* ================= UI ================= */

  return (
    <>
      <Navbar />

      <RecentExperts experts={experts.slice(0, 5)} />

      <div className="main-layout">
        <FilterSidebar onApply={fetchExperts} />

        <div className="experts-grid">
          {loading ? (
            <p>Loading experts...</p>
          ) : experts.length === 0 ? (
            <p>No experts found</p>
          ) : (
            experts.map((e) => (
              <ExpertCard key={e._id} expert={e} />
            ))
          )}
        </div>
      </div>
    </>
  );
}