// src/components/AnimalCard.jsx
// This component displays an individual animal card with its status and action buttons.

export default function AnimalCard({ animal, onFeed, onPlay }) {
  // Helper to determine bar color based on percentage
  const getStatusColor = (value) => {
    if (value >= 60) return '#10b981'; // Green
    if (value >= 30) return '#f59e0b'; // Orange
    return '#ef4444';                   // Red
  };

  return (
    <div className="animal-card">
      {/* Top Habitat Tag */}
      <div className="card-top">
        <span className="habitat-tag">{animal.habitat}</span>
      </div>

      {/* Animal Avatar & Name */}
      <div className="avatar-circle">
        <span className="avatar-emoji">{animal.emoji}</span>
      </div>
      <h3 className="animal-name">{animal.name}</h3>
      <p className="animal-species">Species: {animal.species}</p>

      {/* Status Progress Bars */}
      <div className="meters">
        {/* Hunger Bar */}
        <div className="meter-item">
          <div className="meter-label">
            <span>🍖 Fullness:</span>
            <strong>{animal.hunger}%</strong>
          </div>
          <div className="meter-track">
            <div
              className="meter-fill"
              style={{
                width: `${animal.hunger}%`,
                backgroundColor: getStatusColor(animal.hunger)
              }}
            />
          </div>
        </div>

        {/* Happiness Bar */}
        <div className="meter-item">
          <div className="meter-label">
            <span>❤️ Happiness:</span>
            <strong>{animal.happiness}%</strong>
          </div>
          <div className="meter-track">
            <div
              className="meter-fill"
              style={{
                width: `${animal.happiness}%`,
                backgroundColor: getStatusColor(animal.happiness)
              }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Action Buttons */}
      <div className="action-buttons">
        <button
          className="btn btn-feed"
          onClick={() => onFeed(animal.id)}
          disabled={animal.hunger >= 100}
        >
          🍖 Feed (+20)
        </button>
        <button
          className="btn btn-play"
          onClick={() => onPlay(animal.id)}
          disabled={animal.happiness >= 100}
        >
          🎾 Play (+20)
        </button>
      </div>

      {/* Fun Trivia Box */}
      <div className="fact-box">
        <small>💡 <strong>Did you know?</strong> {animal.funFact}</small>
      </div>
    </div>
  );
}
