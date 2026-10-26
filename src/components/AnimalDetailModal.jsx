// src/components/AnimalDetailModal.jsx
import { useState } from 'react';
import { FOOD_TYPES } from '../data/animalsData';
import { zooAudio } from '../utils/soundEffects';

export default function AnimalDetailModal({
  animal,
  onClose,
  onFeedCustom,
  onPet,
  onClean
}) {
  const [petAnimation, setPetAnimation] = useState(false);
  const [feedNotification, setFeedNotification] = useState('');

  if (!animal) return null;

  const handlePetLarge = () => {
    zooAudio.playPetSound();
    setPetAnimation(true);
    setTimeout(() => setPetAnimation(false), 600);
    onPet(animal.id);
  };

  const handleCustomFeed = (food) => {
    const isPreferred = food.suitableFor.includes(animal.diet);
    zooAudio.playFeedSound();
    onFeedCustom(animal.id, food.hungerBoost, isPreferred);

    setFeedNotification(
      isPreferred
        ? `Yum! ${animal.name} loved the ${food.name}! (+${food.hungerBoost}% Hunger)`
        : `${animal.name} nibbled on the ${food.name}. (+${Math.floor(food.hungerBoost / 2)}% Hunger)`
    );

    setTimeout(() => {
      setFeedNotification('');
    }, 2500);
  };

  const handlePlaySound = () => {
    zooAudio.playAnimalSound(animal.soundType);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Critically Endangered':
        return 'badge-critical';
      case 'Endangered':
        return 'badge-endangered';
      case 'Vulnerable':
        return 'badge-vulnerable';
      case 'Near Threatened':
        return 'badge-threatened';
      default:
        return 'badge-safe';
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="detail-modal-header">
          <div className="header-titles">
            <span className="species-subtitle">{animal.scientificName}</span>
            <h2 className="modal-title">{animal.name} the {animal.species}</h2>
          </div>
          <button className="close-btn" onClick={onClose} title="Close">
            ✕
          </button>
        </div>

        {/* Modal Body Grid */}
        <div className="detail-modal-grid">
          {/* Left Column: Avatar & Interactive Petting */}
          <div className="detail-avatar-col">
            <div
              className={`large-avatar-card ${petAnimation ? 'anim-pet' : ''}`}
              onClick={handlePetLarge}
              title="Click directly on the animal to pet!"
            >
              <div className="large-avatar-circle">
                <span className="large-animal-emoji">{animal.icon}</span>
              </div>
              <span className="pet-tap-hint">Tap animal to Pet! ❤️</span>
            </div>

            <button className="call-btn-large" onClick={handlePlaySound}>
              <span>🔊 Listen to {animal.name}'s Call</span>
            </button>

            {/* Quick stats box */}
            <div className="info-meta-box">
              <div className="meta-row">
                <span className="meta-title">Habitat:</span>
                <span className="meta-val capitalize">{animal.habitat}</span>
              </div>
              <div className="meta-row">
                <span className="meta-title">Diet:</span>
                <span className="meta-val">{animal.diet}</span>
              </div>
              <div className="meta-row">
                <span className="meta-title">Status:</span>
                <span className={`status-tag ${getStatusBadge(animal.conservationStatus)}`}>
                  {animal.conservationStatus}
                </span>
              </div>
              <div className="meta-row">
                <span className="meta-title">Personality:</span>
                <span className="meta-val">{animal.personality}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Health Status & Feeding Tray */}
          <div className="detail-info-col">
            {/* Fun Fact Section */}
            <div className="fun-fact-card">
              <div className="fact-header">
                <span className="fact-icon">💡</span>
                <strong>Wildlife Trivia</strong>
              </div>
              <p className="fact-text">{animal.funFact}</p>
            </div>

            {/* Care Meters */}
            <div className="detail-meters-section">
              <h4>Care Status</h4>
              <div className="meter-grid">
                <div className="detail-meter-item">
                  <div className="meter-meta">
                    <span>🍖 Hunger:</span>
                    <strong>{animal.hunger}%</strong>
                  </div>
                  <div className="meter-track">
                    <div className="meter-bar meter-green" style={{ width: `${animal.hunger}%` }} />
                  </div>
                </div>

                <div className="detail-meter-item">
                  <div className="meter-meta">
                    <span>❤️ Happiness:</span>
                    <strong>{animal.happiness}%</strong>
                  </div>
                  <div className="meter-track">
                    <div className="meter-bar meter-green" style={{ width: `${animal.happiness}%` }} />
                  </div>
                </div>

                <div className="detail-meter-item">
                  <div className="meter-meta">
                    <span>🧼 Enclosure Cleanliness:</span>
                    <strong>{animal.cleanliness}%</strong>
                  </div>
                  <div className="meter-track">
                    <div className="meter-bar meter-green" style={{ width: `${animal.cleanliness}%` }} />
                  </div>
                </div>

                <div className="detail-meter-item">
                  <div className="meter-meta">
                    <span>⚡ Energy:</span>
                    <strong>{animal.energy}%</strong>
                  </div>
                  <div className="meter-track">
                    <div className="meter-bar meter-green" style={{ width: `${animal.energy}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Feeding Tray */}
            <div className="feeding-tray-section">
              <div className="feeding-tray-header">
                <h4>Keeper's Feeding Tray</h4>
                <span className="tray-hint">Select a snack to feed</span>
              </div>

              {feedNotification && (
                <div className="feed-toast-msg">{feedNotification}</div>
              )}

              <div className="food-buttons-grid">
                {FOOD_TYPES.map((food) => {
                  const isMatch = food.suitableFor.includes(animal.diet);
                  return (
                    <button
                      key={food.id}
                      className={`food-select-btn ${isMatch ? 'preferred-food' : 'neutral-food'}`}
                      onClick={() => handleCustomFeed(food)}
                      disabled={animal.hunger >= 100}
                    >
                      <span className="food-icon">{food.icon}</span>
                      <div className="food-btn-text">
                        <span className="food-name">{food.name}</span>
                        <span className="food-boost">+{food.hungerBoost}% Hunger</span>
                      </div>
                      {isMatch && <span className="favorite-star" title="Ideal Diet">⭐</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="detail-actions-bar">
              <button
                className="modal-action-btn pet-action"
                onClick={handlePetLarge}
              >
                ❤️ Pet & Cuddle
              </button>
              <button
                className="modal-action-btn clean-action"
                onClick={() => {
                  zooAudio.playCleanSound();
                  onClean(animal.id);
                }}
                disabled={animal.cleanliness >= 100}
              >
                🧼 Clean Habitat (+30%)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
