// src/App.jsx
// Main controller component for the Virtual Zoo Desktop Application.

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AnimalCard from './components/AnimalCard';
import AddAnimalModal from './components/AddAnimalModal';
import AnimalDetailsModal from './components/AnimalDetailsModal';
import { INITIAL_ANIMALS, HABITATS } from './data/animals';
import './App.css';

export default function App() {
  // STATE
  const [animals, setAnimals] = useState(INITIAL_ANIMALS);
  const [selectedHabitat, setSelectedHabitat] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailAnimal, setDetailAnimal] = useState(null);

  // SIMULATION: hunger drops by 3% every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimals((prev) =>
        prev.map((a) => ({ ...a, hunger: Math.max(0, a.hunger - 3) }))
      );
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // Add New Animal
  const handleAddAnimal = (newAnimalData) => {
    const newAnimal = { ...newAnimalData, id: animals.length + 1 };
    setAnimals((prev) => [...prev, newAnimal]);
  };

  // View animal details — find the live version in state so meters are current
  const handleViewDetails = (animal) => {
    const live = animals.find((a) => a.id === animal.id) || animal;
    setDetailAnimal(live);
  };

  // CALCULATED VALUES
  const averageHappiness = Math.round(
    animals.reduce((t, a) => t + a.happiness, 0) / (animals.length || 1)
  );

  const displayedAnimals =
    selectedHabitat === 'All'
      ? animals
      : animals.filter((a) => a.habitat === selectedHabitat);

  // RENDER
  return (
    <div className="zoo-container">
      {/* 1. Navbar */}
      <Navbar
        totalAnimals={animals.length}
        onOpenModal={() => setIsModalOpen(true)}
      />

      {/* 2. Habitat Filter Tabs */}
      <section className="habitat-tabs-section">
        <span className="filter-title">Filter by Habitat:</span>
        <div className="tabs-row">
          {HABITATS.map((hab) => (
            <button
              key={hab}
              className={`tab-btn ${selectedHabitat === hab ? 'active' : ''}`}
              onClick={() => setSelectedHabitat(hab)}
            >
              {hab} {hab === 'All' ? `(${animals.length})` : ''}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Animals Grid */}
      <main className="animals-grid">
        {displayedAnimals.length === 0 ? (
          <div className="empty-message">
            <p>No animals currently in this enclosure. Click <strong>+ Add Animal</strong> to add one!</p>
          </div>
        ) : (
          displayedAnimals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onViewDetails={handleViewDetails}
            />
          ))
        )}
      </main>

      {/* 4. Add Animal Modal */}
      {isModalOpen && (
        <AddAnimalModal
          onClose={() => setIsModalOpen(false)}
          onAddAnimal={handleAddAnimal}
        />
      )}

      {/* 5. Animal Details Modal */}
      {detailAnimal && (
        <AnimalDetailsModal
          animal={detailAnimal}
          onClose={() => setDetailAnimal(null)}
        />
      )}

      {/* 6. Footer */}
      <footer className="zoo-footer">
        <p>🐾 Virtual Zoo Sanctuary • Interactive Desktop App</p>
      </footer>
    </div>
  );
}
