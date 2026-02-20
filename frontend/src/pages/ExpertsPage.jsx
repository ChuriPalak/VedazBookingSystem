import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RecentExperts from "../components/RecentExperts";
import FilterSidebar from "../components/FilterSidebar";
import ExpertCard from "../components/ExpertCard";
import api from "../services/api";
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

  // 🔥 fetch experts
  const fetchExperts = async (filterParams = {}) => {
    try {
      setLoading(true);

      const query = new URLSearchParams(filterParams).toString();
      const res = await api.get(`/experts?${query}`);

      const data = res.data?.experts || res.data || [];

      // ✅ fallback if empty
      setExperts(data.length ? data : demoExperts);
    } catch (err) {
      console.error("Error fetching experts", err);

      // 🚨 CRITICAL FIX — fallback on error
      setExperts(demoExperts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  return (
    <>
      <Navbar />

      <RecentExperts experts={experts.slice(0, 5)} />

      <div className="main-layout">
        <FilterSidebar onApply={fetchExperts} />

        <div className="experts-grid">
          {loading ? (
            <p>Loading experts...</p>
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
