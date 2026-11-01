// src/App.jsx
// Main controller component for the Virtual Zoo Desktop Application.
// It manages:
// 1. The list of animals (state)
// 2. The active habitat filter (state)
// 3. User actions: Feed, Play, and Add Animal (functions)

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AnimalCard from './components/AnimalCard';
import AddAnimalModal from './components/AddAnimalModal';
import { INITIAL_ANIMALS, HABITATS } from './data/animals';
import './App.css';

export default function App() {
  // -------------------------------------------------------------
  // STATE VARIABLES
  // -------------------------------------------------------------
  // 1. 'animals': array storing all animals currently in our zoo
  const [animals, setAnimals] = useState(INITIAL_ANIMALS);

  // 2. 'selectedHabitat': filter by habitat ('All', 'Savannah', 'Jungle', etc.)
  const [selectedHabitat, setSelectedHabitat] = useState('All');

  // 3. 'isModalOpen': controls whether the "Add Animal" modal dialog is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  // -------------------------------------------------------------
  // SIMULATION EFFECT: Slowly decreases hunger over time
  // -------------------------------------------------------------
  useEffect(() => {
    // Every 15 seconds, hunger drops by 3% so animals need care
    const timer = setInterval(() => {
      setAnimals((prevList) =>
        prevList.map((animal) => ({
          ...animal,
          hunger: Math.max(0, animal.hunger - 3)
        }))
      );
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  // -------------------------------------------------------------
  // HANDLER FUNCTIONS (Simple and easy to explain!)
  // -------------------------------------------------------------

  // Function 1: Feed Animal (increases hunger/fullness by +20)
  const handleFeed = (animalId) => {
    setAnimals((prevList) =>
      prevList.map((animal) => {
        if (animal.id === animalId) {
          return { ...animal, hunger: Math.min(100, animal.hunger + 20) };
        }
        return animal;
      })
    );
  };

  // Function 2: Play with Animal (increases happiness by +20)
  const handlePlay = (animalId) => {
    setAnimals((prevList) =>
      prevList.map((animal) => {
        if (animal.id === animalId) {
          return { ...animal, happiness: Math.min(100, animal.happiness + 20) };
        }
        return animal;
      })
    );
  };

  // Function 3: Add New Animal to Zoo
  const handleAddAnimal = (newAnimalData) => {
    const newAnimal = {
      ...newAnimalData,
      id: animals.length + 1
    };
    setAnimals((prevList) => [...prevList, newAnimal]);
  };

  // -------------------------------------------------------------
  // CALCULATED VALUES
  // -------------------------------------------------------------
  // Average happiness across all animals
  const averageHappiness = Math.round(
    animals.reduce((total, a) => total + a.happiness, 0) / (animals.length || 1)
  );

  // Filter animals based on the selected habitat tab
  const displayedAnimals = selectedHabitat === 'All'
    ? animals
    : animals.filter((a) => a.habitat === selectedHabitat);

  // -------------------------------------------------------------
  // RENDER (UI)
  // -------------------------------------------------------------
  return (
    <div className="zoo-container">
      {/* 1. Top Navbar */}
      <Navbar
        totalAnimals={animals.length}
        averageHappiness={averageHappiness}
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
              onFeed={handleFeed}
              onPlay={handlePlay}
            />
          ))
        )}
      </main>

      {/* 4. Add Animal Modal Dialog */}
      {isModalOpen && (
        <AddAnimalModal
          onClose={() => setIsModalOpen(false)}
          onAddAnimal={handleAddAnimal}
        />
      )}

      {/* 5. Footer */}
      <footer className="zoo-footer">
        <p>🐾 Virtual Zoo Sanctuary • Interactive Desktop App</p>
      </footer>
    </div>
  );
}
