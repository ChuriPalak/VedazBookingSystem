export default function RecentExperts({ experts }) {
  return (
    <div className="recent-section">
      <h3>Recently Consulted</h3>

      <div className="recent-row">
        {experts.map((e, i) => (
          <div key={i} className="recent-item">
            <img src={e.image} className="recent-img" />
            <p>{e.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
