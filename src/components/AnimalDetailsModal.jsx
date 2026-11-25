// src/components/AnimalDetailsModal.jsx
// A beautiful full-detail modal showing habitat, rarity, population, facts, etc.

export default function AnimalDetailsModal({ animal, onClose }) {
  if (!animal) return null;

  // Rarity badge styling
  const rarityStyle = (r) => {
    if (r === 'Endangered' || r === 'Critically Endangered')
      return { bg: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'rgba(239,68,68,0.4)' };
    if (r === 'Vulnerable' || r === 'Near Threatened')
      return { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: 'rgba(245,158,11,0.4)' };
    return { bg: 'rgba(16,185,129,0.15)', color: '#34d399', border: 'rgba(16,185,129,0.4)' };
  };

  const rs = rarityStyle(animal.rarity);

  return (
    <div className="detail-backdrop" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── HERO BANNER with photo ───────────────── */}
        <div className="detail-hero">
          {animal.image ? (
            <img src={animal.image} alt={animal.species} className="detail-hero-img" />
          ) : (
            <div className="detail-hero-emoji">{animal.emoji}</div>
          )}
          <div className="detail-hero-overlay" />
          <div className="detail-hero-content">
            <span className="detail-habitat-badge">{animal.habitat}</span>
            <h2 className="detail-title">{animal.name}</h2>
            <p className="detail-scientific">{animal.scientificName || animal.species}</p>
          </div>
          <button className="detail-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* ── BODY ─────────────────────────────────── */}
        <div className="detail-body">

          {/* Quick stats cards */}
          <div className="detail-stats-grid">
            <div className="detail-stat-card">
              <span className="stat-card-icon">🛡️</span>
              <span className="stat-card-label">Rarity</span>
              <span
                className="stat-card-value"
                style={{
                  background: rs.bg,
                  color: rs.color,
                  border: `1px solid ${rs.border}`,
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 800
                }}
              >
                {animal.rarity || 'Unknown'}
              </span>
            </div>

            <div className="detail-stat-card">
              <span className="stat-card-icon">📊</span>
              <span className="stat-card-label">Population Left</span>
              <span className="stat-card-value stat-population">{animal.populationLeft || 'Unknown'}</span>
            </div>

            <div className="detail-stat-card">
              <span className="stat-card-icon">🍖</span>
              <span className="stat-card-label">Diet</span>
              <span className="stat-card-value">{animal.diet || 'Unknown'}</span>
            </div>

            <div className="detail-stat-card">
              <span className="stat-card-icon">⏳</span>
              <span className="stat-card-label">Lifespan</span>
              <span className="stat-card-value">{animal.lifespan || 'Unknown'}</span>
            </div>

            <div className="detail-stat-card">
              <span className="stat-card-icon">⚖️</span>
              <span className="stat-card-label">Weight</span>
              <span className="stat-card-value">{animal.weight || 'Unknown'}</span>
            </div>

            <div className="detail-stat-card">
              <span className="stat-card-icon">🌍</span>
              <span className="stat-card-label">Species</span>
              <span className="stat-card-value">{animal.species}</span>
            </div>
          </div>

          {/* Habitat description */}
          <div className="detail-section">
            <h3 className="detail-section-title">🏞️ Habitat</h3>
            <p className="detail-section-text">
              {animal.habitatDescription || `Lives in the ${animal.habitat} biome.`}
            </p>
          </div>

          {/* Facts */}
          <div className="detail-section">
            <h3 className="detail-section-title">🧠 Fascinating Facts</h3>
            <ul className="detail-facts-list">
              {(animal.facts && animal.facts.length > 0 ? animal.facts : [animal.funFact]).map(
                (fact, i) => (
                  <li key={i} className="detail-fact-item">
                    <span className="fact-bullet">✦</span>
                    <span>{fact}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Current status */}
          <div className="detail-section">
            <h3 className="detail-section-title">💊 Current Status in Zoo</h3>
            <div className="detail-status-bars">
              <div className="detail-bar-row">
                <span className="detail-bar-label">🍖 Fullness</span>
                <div className="detail-bar-track">
                  <div
                    className="detail-bar-fill"
                    style={{
                      width: `${animal.hunger}%`,
                      background: animal.hunger >= 60 ? '#10b981' : animal.hunger >= 30 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
                <span className="detail-bar-pct">{animal.hunger}%</span>
              </div>
              <div className="detail-bar-row">
                <span className="detail-bar-label">❤️ Happiness</span>
                <div className="detail-bar-track">
                  <div
                    className="detail-bar-fill"
                    style={{
                      width: `${animal.happiness}%`,
                      background: animal.happiness >= 60 ? '#10b981' : animal.happiness >= 30 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
                <span className="detail-bar-pct">{animal.happiness}%</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
