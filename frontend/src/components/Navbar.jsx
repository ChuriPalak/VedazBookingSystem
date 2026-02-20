import "../styles/vedaz.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="logo">Vedaz</h1>

      <div className="nav-right">
        <span className="bell">🔔</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="profile-img"
        />
      </div>
    </div>
  );
}
