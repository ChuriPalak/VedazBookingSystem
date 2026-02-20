import { useNavigate } from "react-router-dom";

export default function ExpertCard({ expert }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/expert/${expert._id}`);
  };

  return (
    <div
      className="expert-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="expert-img-wrapper">
        <img src={expert.image} className="expert-img" />
      </div>

      <div className="expert-content">
        <h4>{expert.name}</h4>
        <p className="category">{expert.category}</p>
        <p>{expert.experience} years experience</p>
        <p className="rating">⭐ {expert.rating}</p>
      </div>
    </div>
  );
}
