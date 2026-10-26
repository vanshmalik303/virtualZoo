// src/components/AdoptModal.jsx
import { useState } from 'react';
import { HABITATS, ADOPTABLE_SPECIES } from '../data/animalsData';
import { zooAudio } from '../utils/soundEffects';

const RANDOM_NAMES = [
  'Simba', 'Barnaby', 'Mochi', 'Zephyr', 'Kona', 'Bramble', 'Pippin',
  'Coco', 'Ziggy', 'Kiko', 'Titus', 'Luna', 'Cleo', 'Jasper', 'Nala'
];

function buildNewAnimal(species, name) {
  return {
    id: `${species.habitat}-${Date.now()}`,
    name: name,
    species: species.species,
    habitat: species.habitat,
    icon: species.icon,
    diet: species.diet,
    favoriteFood: species.defaultFood,
    hunger: 90,
    happiness: 95,
    cleanliness: 90,
    energy: 90,
    scientificName: species.scientificName,
    conservationStatus: species.conservationStatus,
    personality: species.personality,
    soundType: species.soundType,
    funFact: species.funFact
  };
}

export default function AdoptModal({ onClose, onAdopt, coins }) {
  const [selectedHabitat, setSelectedHabitat] = useState('rainforest');
  const [selectedSpeciesIndex, setSelectedSpeciesIndex] = useState(0);
  const [customName, setCustomName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const adoptionCost = 100;

  // Filter adoptable species based on habitat
  const habitatSpecies = ADOPTABLE_SPECIES.filter(
    (s) => s.habitat === selectedHabitat
  );

  const currentSpecies = habitatSpecies[selectedSpeciesIndex] || habitatSpecies[0] || ADOPTABLE_SPECIES[0];

  const handleRandomName = () => {
    const random = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
    setCustomName(random);
  };

  const handleAdopt = (e) => {
    e.preventDefault();
    const finalName = customName.trim() || currentSpecies.species;

    if (coins < adoptionCost) {
      setErrorMsg(`You need at least ${adoptionCost} coins to adopt an animal! Keep your current animals happy to earn more.`);
      return;
    }

    zooAudio.playAdoptSound();

    const newAnimal = buildNewAnimal(currentSpecies, finalName);

    onAdopt(newAnimal, adoptionCost);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content adopt-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="adopt-modal-header">
          <div>
            <h2>🐾 Adopt a New Resident</h2>
            <p className="adopt-subtitle">Bring an endangered or beloved animal to your sanctuary!</p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {errorMsg && <div className="adopt-error-banner">{errorMsg}</div>}

        {/* Step 1: Habitat Selector */}
        <div className="adopt-section">
          <label className="section-title">1. Choose Enclosure Habitat</label>
          <div className="adopt-habitat-tabs">
            {HABITATS.filter(h => h.id !== 'all').map((h) => (
              <button
                key={h.id}
                className={`adopt-hab-btn ${selectedHabitat === h.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedHabitat(h.id);
                  setSelectedSpeciesIndex(0);
                }}
              >
                <span>{h.icon}</span> {h.name}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Species Selection */}
        <div className="adopt-section">
          <label className="section-title">2. Select Species</label>
          <div className="species-grid">
            {habitatSpecies.map((spec, idx) => (
              <div
                key={spec.species}
                className={`species-card-option ${selectedSpeciesIndex === idx ? 'selected' : ''}`}
                onClick={() => setSelectedSpeciesIndex(idx)}
              >
                <span className="species-option-icon">{spec.icon}</span>
                <span className="species-option-title">{spec.species}</span>
                <span className="species-option-diet">{spec.diet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preview & Naming */}
        <div className="adopt-preview-section">
          <div className="preview-avatar">
            <span className="preview-emoji">{currentSpecies.icon}</span>
          </div>
          <div className="preview-info">
            <h4>{currentSpecies.species}</h4>
            <p className="preview-latin"><em>{currentSpecies.scientificName}</em></p>
            <p className="preview-fact">“{currentSpecies.funFact}”</p>
          </div>
        </div>

        {/* Step 3: Animal Name */}
        <div className="adopt-section">
          <label className="section-title">3. Give Your Animal a Name</label>
          <div className="name-input-group">
            <input
              type="text"
              placeholder={`e.g. ${currentSpecies.species}...`}
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="name-input"
              maxLength={24}
            />
            <button type="button" className="dice-btn" onClick={handleRandomName} title="Pick random name">
              🎲 Random Name
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="adopt-footer">
          <div className="cost-tag">
            <span>Adoption Fee:</span>
            <strong>🪙 {adoptionCost} Coins</strong>
            <span className="wallet-balance">(You have: {coins} coins)</span>
          </div>

          <button
            className="confirm-adopt-btn"
            onClick={handleAdopt}
            disabled={coins < adoptionCost}
          >
            🎉 Welcome {customName || currentSpecies.species} to Zoo!
          </button>
        </div>
      </div>
    </div>
  );
}
