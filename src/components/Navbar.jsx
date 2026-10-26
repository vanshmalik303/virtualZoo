// src/components/Navbar.jsx
// This component displays the top navigation bar with zoo stats and the 'Add Animal' button.

export default function Navbar({ totalAnimals, averageHappiness, onOpenModal }) {
  return (
    <header className="zoo-navbar">
      <div className="brand">
        <span className="brand-icon">🦁</span>
        <div>
          <h1>Virtual Zoo Sanctuary</h1>
          <p className="subtitle">Desktop Animal Care App</p>
        </div>
      </div>

      <div className="zoo-stats">
        <div className="stat-box">
          <span className="stat-label">Animals:</span>
          <span className="stat-value">{totalAnimals}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Zoo Happiness:</span>
          <span className="stat-value">{averageHappiness}%</span>
        </div>
        <button className="add-btn" onClick={onOpenModal}>
          ➕ Add Animal
        </button>
      </div>
    </header>
  );
}
