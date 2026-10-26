// src/components/AddAnimalModal.jsx
// This component provides a clean popup form to add a new animal to the sanctuary.

import { useState } from 'react';

const COMMON_EMOJIS = ['🦊', '🐼', '🦒', '🦓', '🦘', '🦭', '🦩', '🦅'];

export default function AddAnimalModal({ onClose, onAddAnimal }) {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [emoji, setEmoji] = useState('🦊');
  const [habitat, setHabitat] = useState('Savannah');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !species.trim()) {
      alert('Please enter a name and species for your animal!');
      return;
    }

    // Create the new animal object
    const newAnimal = {
      name: name.trim(),
      species: species.trim(),
      emoji: emoji,
      habitat: habitat,
      hunger: 80,
      happiness: 85,
      funFact: `${species}s are wonderful additions to our sanctuary!`
    };

    onAddAnimal(newAnimal);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🐾 Add New Animal</h2>
          <button className="close-x-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Animal Name */}
          <div className="form-group">
            <label>Animal Name:</label>
            <input
              type="text"
              placeholder="e.g. Simba, Bella, Charlie..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Species */}
          <div className="form-group">
            <label>Species:</label>
            <input
              type="text"
              placeholder="e.g. Red Panda, Giraffe, Koala..."
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              required
            />
          </div>

          {/* Habitat */}
          <div className="form-group">
            <label>Habitat Enclosure:</label>
            <select value={habitat} onChange={(e) => setHabitat(e.target.value)}>
              <option value="Savannah">Savannah</option>
              <option value="Jungle">Jungle</option>
              <option value="Arctic">Arctic</option>
              <option value="Ocean">Ocean</option>
            </select>
          </div>

          {/* Emoji Choice */}
          <div className="form-group">
            <label>Pick an Emoji Avatar:</label>
            <div className="emoji-picker">
              {COMMON_EMOJIS.map((em) => (
                <button
                  type="button"
                  key={em}
                  className={`emoji-btn ${emoji === em ? 'selected' : ''}`}
                  onClick={() => setEmoji(em)}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              🎉 Add to Zoo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
