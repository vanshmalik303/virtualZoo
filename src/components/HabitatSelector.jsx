// src/components/HabitatSelector.jsx
import { HABITATS } from '../data/animalsData';

export default function HabitatSelector({
  activeHabitat,
  setActiveHabitat,
  animals,
  searchQuery,
  setSearchQuery,
  quickFilter,
  setQuickFilter
}) {
  const getAnimalCount = (habitatId) => {
    if (habitatId === 'all') return animals.length;
    return animals.filter((a) => a.habitat === habitatId).length;
  };

  return (
    <div className="habitat-selector-container">
      {/* Habitat Tabs */}
      <div className="habitat-tabs" role="tablist">
        {HABITATS.map((hab) => {
          const isActive = activeHabitat === hab.id;
          const count = getAnimalCount(hab.id);
          return (
            <button
              key={hab.id}
              role="tab"
              aria-selected={isActive}
              className={`habitat-tab ${hab.theme} ${isActive ? 'active' : ''}`}
              onClick={() => setActiveHabitat(hab.id)}
            >
              <span className="tab-icon">{hab.icon}</span>
              <div className="tab-details">
                <span className="tab-name">{hab.name}</span>
                <span className="tab-badge">{count} {count === 1 ? 'resident' : 'residents'}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="filter-search-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, species, diet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>

        <div className="quick-filters">
          <span className="quick-filter-label">Quick Filter:</span>
          {[
            { id: 'all', label: 'All Animals' },
            { id: 'hungry', label: '🍖 Needs Food (<50%)' },
            { id: 'unhappy', label: '❤️ Needs Play (<50%)' },
            { id: 'dirty', label: '🧼 Needs Cleaning (<50%)' }
          ].map((f) => (
            <button
              key={f.id}
              className={`filter-chip ${quickFilter === f.id ? 'active' : ''}`}
              onClick={() => setQuickFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
