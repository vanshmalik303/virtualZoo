// src/components/AnimalCard.jsx
// Horizontal card design: text on the left, animal photo bleeding in from the right.

export default function AnimalCard({ animal, onFeed, onPlay }) {
  // Derive a 0.0–5.0 star rating from happiness
  const starRating = (animal.happiness / 20).toFixed(1);

  // Color for status values
  const statusColor = (v) => {
    if (v >= 60) return '#10b981';
    if (v >= 30) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="animal-card">

      {/* ── LEFT: all text content ─────────────────── */}
      <div className="card-left">

        {/* Habitat badge */}
        <span className="habitat-tag">{animal.habitat}</span>

        {/* Name */}
        <h3 className="animal-name">{animal.name}</h3>

        {/* Star rating row */}
        <div className="card-rating">
          <span className="star-icon">⭐</span>
          <span className="star-value">{starRating}</span>
          {animal.hunger < 35 && (
            <span className="badge badge-hungry">HUNGRY</span>
          )}
          {animal.happiness < 35 && (
            <span className="badge badge-sad">NEEDS PLAY</span>
          )}
        </div>

        {/* Info rows (like Location / Show Time in the reference) */}
        <div className="card-info">
          <div className="info-row">
            <span className="info-label">Species</span>
            <span className="info-value">{animal.species}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Fullness</span>
            <span className="info-value" style={{ color: statusColor(animal.hunger) }}>
              {animal.hunger}%
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Happiness</span>
            <span className="info-value" style={{ color: statusColor(animal.happiness) }}>
              {animal.happiness}%
            </span>
          </div>
        </div>

        {/* Feed / Play buttons */}
        <div className="card-actions">
          <button
            className="card-btn btn-feed"
            onClick={() => onFeed(animal.id)}
            disabled={animal.hunger >= 100}
          >
            🍖 Feed (+20)
          </button>
          <button
            className="card-btn btn-play"
            onClick={() => onPlay(animal.id)}
            disabled={animal.happiness >= 100}
          >
            🎾 Play (+20)
          </button>
        </div>

        {/* Fun fact strip */}
        <div className="fact-strip">
          💡 <strong>Did you know?</strong> {animal.funFact}
        </div>
      </div>

      {/* ── RIGHT: photo that bleeds in from the edge ── */}
      <div className="card-right">
        {/* Gradient that melts the image into the card bg */}
        <div className="img-fade" />
        {animal.image ? (
          <img
            src={animal.image}
            alt={animal.species}
            className="card-animal-img"
            onError={(e) => {
              // Graceful emoji fallback
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
