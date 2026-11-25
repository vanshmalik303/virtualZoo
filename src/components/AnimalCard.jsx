// src/components/AnimalCard.jsx
// This card shows an animal photo on the right and its basic info on the left.

export default function AnimalCard({ animal, onViewDetails }) {
  // Convert happiness (0 to 100) into a star score out of 5 (like 4.5 ⭐)
  const starScore = (animal.happiness / 20).toFixed(1);

  // Pick a simple color for hunger and happiness numbers
  const getNumberColor = (value) => {
    if (value >= 60) return '#10b981'; // Green: good!
    if (value >= 30) return '#f59e0b'; // Yellow: okay
    return '#ef4444';                  // Red: needs attention!
  };

  // Color tag for rarity
  const getRarityTag = (rarity) => {
    if (rarity === 'Endangered' || rarity === 'Critically Endangered') {
      return { bg: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '#ef4444' };
    }
    if (rarity === 'Vulnerable' || rarity === 'Near Threatened') {
      return { bg: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '#f59e0b' };
    }
    return { bg: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '#10b981' };
  };

  const tag = getRarityTag(animal.rarity);

  return (
    <div className="animal-card">

      {/* LEFT SIDE: Information */}
      <div className="card-left">

        {/* Habitat tag */}
        <span className="habitat-tag">{animal.habitat}</span>

        {/* Animal Name */}
        <h3 className="animal-name">{animal.name}</h3>

        {/* Star Rating & Rarity */}
        <div className="card-rating">
          <span className="star-icon">⭐</span>
          <span className="star-value">{starScore}</span>
          {animal.rarity && (
            <span
              className="badge"
              style={{
                background: tag.bg,
                color: tag.color,
                border: `1px solid ${tag.border}`
              }}
            >
              {animal.rarity.toUpperCase()}
            </span>
          )}
        </div>

        {/* Animal Details List */}
        <div className="card-info">
          <div className="info-row">
            <span className="info-label">Species</span>
            <span className="info-value">{animal.species}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Fullness</span>
            <span className="info-value" style={{ color: getNumberColor(animal.hunger) }}>
              {animal.hunger}%
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Happiness</span>
            <span className="info-value" style={{ color: getNumberColor(animal.happiness) }}>
              {animal.happiness}%
            </span>
          </div>
        </div>

        {/* Button to open full details */}
        <div className="card-actions">
          <button
            className="card-btn btn-details"
            onClick={() => onViewDetails(animal)}
          >
            📋 View Details
          </button>
        </div>

        {/* Fun fact box */}
        <div className="fact-strip">
          💡 <strong>Did you know?</strong> {animal.funFact}
        </div>
      </div>

      {/* RIGHT SIDE: Real Animal Photo */}
      <div className="card-right">
        <div className="img-fade" />
        {animal.image ? (
          <img
            src={animal.image}
            alt={animal.name}
            className="card-animal-img"
            onError={(e) => {
              // If image fails, show emoji instead
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <span
          className="card-emoji-fallback"
          style={{ display: animal.image ? 'none' : 'flex' }}
        >
          {animal.emoji}
        </span>
      </div>

    </div>
  );
}
