import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/vedaz.css";
import { useState } from "react";
import BookingModal from "../components/BookingModal";

export default function ExpertDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ modal state (MISSING BEFORE)
  const [openModal, setOpenModal] = useState(false);

  // 🔥 dummy data (replace with API later)
  const expert = {
    name: "Dr. Shalini Sharma",
    category: "Vedic Astrologer",
    rating: 4.8,
    reviewsCount: 120,
    experience: 12,
    email: "shalini.sharma@example.com",
    phone: "+91 9876543210",
    bio:
      "Experienced Vedic astrologer with over 12 years of practice in horoscope reading, kundali analysis, and remedial astrology.",
    expertise: [
      "Horoscope Reading",
      "Kundali Analysis",
      "Vedic Astrology",
      "Gemstone Therapy",
    ],
  };

  return (
    <>
      <Navbar />

      <div className="detail-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Experts
        </button>

        <div className="detail-layout">
          {/* LEFT SIDE */}
          <div className="detail-left">
            <div className="expert-header">
              <img
                src="https://i.pravatar.cc/200?img=5"
                className="detail-avatar"
              />

              <div>
                <h2>{expert.name}</h2>
                <p className="category">{expert.category}</p>
                <p className="rating">
                  ⭐ {expert.rating} ({expert.reviewsCount} Reviews)
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="section">
              <h3>Bio</h3>
              <p>{expert.bio}</p>
            </div>

            {/* Expertise */}
            <div className="section">
              <h3>Expertise</h3>
              <div className="chips">
                {expert.expertise.map((item, i) => (
                  <span key={i} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="section">
              <h3>Client Reviews</h3>

              <ReviewItem
                name="Rohit Mehta"
                text="Very insightful session. Helped me a lot!"
              />

              <ReviewItem
                name="Priya Kapoor"
                text="Accurate readings and great advice."
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="detail-right">
            <div className="contact-card">
              <p>📧 {expert.email}</p>
              <p>📞 {expert.phone}</p>
            </div>

            <div className="booking-card">
              <h3>Book a Slot</h3>

              <div className="slot-row">
                <button className="slot">10:00 AM</button>
                <button className="slot">11:00 AM</button>
                <button className="slot">2:00 PM</button>
                <button className="slot">4:00 PM</button>
              </div>

              {/* ✅ FIXED BUTTON */}
              <button
                className="confirm-btn"
                onClick={() => setOpenModal(true)}
              >
                Book Slot
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ MODAL RENDER (MISSING BEFORE) */}
      <BookingModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        expert={expert}
      />
    </>
  );
}

function ReviewItem({ name, text }) {
  return (
    <div className="review-item">
      <img src="https://i.pravatar.cc/40" />
      <div>
        <strong>{name}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}