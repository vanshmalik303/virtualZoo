// src/components/AnimalDetailsModal.jsx
// This popup shows full details about an animal when the user clicks "View Details".

export default function AnimalDetailsModal({ animal, onClose }) {
  // If no animal is chosen, don't show anything
  if (!animal) return null;

  // Simple color picker for the rarity badge
  const getRarityBadgeStyle = (rarity) => {
    if (rarity === 'Endangered' || rarity === 'Critically Endangered') {
      return {
        background: 'rgba(239, 68, 68, 0.15)',
        color: '#f87171',
        border: '1px solid rgba(239, 68, 68, 0.4)'
      };
    }
    if (rarity === 'Vulnerable' || rarity === 'Near Threatened') {
      return {
        background: 'rgba(245, 158, 11, 0.15)',
        color: '#fbbf24',
        border: '1px solid rgba(245, 158, 11, 0.4)'
      };
    }
    // Default safe / least concern (green)
    return {
      background: 'rgba(16, 185, 129, 0.15)',
      color: '#34d399',
      border: '1px solid rgba(16, 185, 129, 0.4)'
    };
  };

  const badgeStyle = getRarityBadgeStyle(animal.rarity);

  return (
    <div className="detail-backdrop" onClick={onClose}>
      {/* stopPropagation prevents closing when clicking inside the box */}
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>

        {/* 1. Header with Animal Image and Name */}
        <div className="detail-hero">
          {animal.image ? (
            <img src={animal.image} alt={animal.name} className="detail-hero-img" />
          ) : (
            <div className="detail-hero-emoji">{animal.emoji}</div>
          )}
          <div className="detail-hero-overlay" />
          <div className="detail-hero-content">
            <span className="detail-habitat-badge">{animal.habitat}</span>
            <h2 className="detail-title">{animal.name}</h2>
            <p className="detail-scientific">{animal.scientificName || animal.species}</p>
          </div>
          <button className="detail-close-btn" onClick={onClose} title="Close">✕</button>
        </div>

        {/* 2. Main Content Body */}
        <div className="detail-body">

          {/* Quick stats grid */}
          <div className="detail-stats-grid">
            <div className="detail-stat-card">
              <span className="stat-card-icon">🛡️</span>
              <span className="stat-card-label">Rarity</span>
              <span
                className="stat-card-value"
                style={{
                  ...badgeStyle,
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 800
                }}
              >
                {animal.rarity || 'Common'}
              </span>
            </div>

            <div className="detail-stat-card">
              <span className="stat-card-icon">📊</span>
              <span className="stat-card-label">Species Left</span>
              <span className="stat-card-value stat-population">
                {animal.populationLeft || 'Many'}
              </span>
            </div>

            <div className="detail-stat-card">
              <span className="stat-card-icon">🍖</span>
              <span className="stat-card-label">Diet</span>
              <span className="stat-card-value">{animal.diet || 'Plants & Meat'}</span>
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

          {/* Habitat section */}
          <div className="detail-section">
            <h3 className="detail-section-title">🏞️ Habitat</h3>
            <p className="detail-section-text">
              {animal.habitatDescription || `Lives in the ${animal.habitat} area.`}
            </p>
          </div>

          {/* Fun facts list */}
          <div className="detail-section">
            <h3 className="detail-section-title">🧠 Cool Facts</h3>
            <ul className="detail-facts-list">
              {(animal.facts || [animal.funFact]).map((fact, index) => (
                <li key={index} className="detail-fact-item">
                  <span className="fact-bullet">✦</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
