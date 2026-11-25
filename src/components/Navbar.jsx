// src/components/Navbar.jsx
// Top navigation bar with elegant sanctuary branding and stats

export default function Navbar({ totalAnimals, averageHappiness, onOpenModal }) {
  return (
    <header className="zoo-navbar">
      <div className="brand">
        <div className="brand-badge">EST. 2026</div>
        <div className="brand-text">
          <h1 className="brand-title">
            VIRTUAL ZOO <span className="brand-accent">SANCTUARY</span>
          </h1>
          <p className="brand-tagline">WILDLIFE CONSERVATION & RESEARCH</p>
        </div>
      </div>

      <div className="zoo-stats">
        <div className="stat-box">
          <span className="stat-label">RESIDENTS</span>
          <span className="stat-value">{totalAnimals}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">HAPPINESS</span>
          <span className="stat-value">{averageHappiness}%</span>
        </div>
        <button className="add-btn" onClick={onOpenModal}>
          + Add Resident
        </button>
      </div>
    </header>
  );
}
