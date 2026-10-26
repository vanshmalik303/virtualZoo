# 🦁 Virtual Zoo Sanctuary — Explanation & Viva Guide

Use this simple guide to explain your application's functionality, architecture, and code step-by-step in any presentation, viva exam, or demonstration.

---

## 1. High-Level Summary (The 30-Second Pitch)

> *"This project is an interactive **Virtual Zoo Sanctuary Desktop Application** built using **React** and **Electron**. It simulates a digital wildlife sanctuary where users can care for animals across different habitats (Savannah, Jungle, Arctic, and Ocean). Users can feed animals, play with them to raise their happiness, hear them speak using the browser's built-in Speech Synthesis API, filter animals by habitat, and adopt new animals through a popup form."*

---

## 2. Core Architecture & File Structure

Here is how the project is organized:

```
src/
├── data/
│   └── animals.js        -> Contains the starter list of animals & the speakText() helper.
├── components/
│   ├── Navbar.jsx        -> Shows zoo title, animal count, happiness %, and "Add Animal" button.
│   ├── AnimalCard.jsx    -> Displays an animal's avatar, hunger & happiness bars, and action buttons.
│   └── AddAnimalModal.jsx-> A modal form to add a new animal to the zoo.
├── App.jsx               -> The central controller: manages state and handles user actions.
├── App.css               -> Clean, modern styles for cards, buttons, and layout.
└── main.jsx              -> Mounts the React application into the DOM.
```

---

## 3. How the Core State Works (In `App.jsx`)

There are **3 main state variables** in `App.jsx` using React's `useState`:

1. **`animals`**:
   - **What it is**: An array of objects representing all the animals in the zoo.
   - **Properties per animal**: `id`, `name`, `species`, `emoji`, `habitat`, `hunger` (0-100), `happiness` (0-100), `sound`, and `funFact`.
   - **Code**: `const [animals, setAnimals] = useState(INITIAL_ANIMALS);`

2. **`selectedHabitat`**:
   - **What it is**: A string indicating which habitat filter is currently active (`'All'`, `'Savannah'`, `'Jungle'`, `'Arctic'`, `'Ocean'`).
   - **Code**: `const [selectedHabitat, setSelectedHabitat] = useState('All');`

3. **`isModalOpen`**:
   - **What it is**: A boolean (`true` or `false`) that controls whether the "Add Animal" popup is visible.
   - **Code**: `const [isModalOpen, setIsModalOpen] = useState(false);`

---

## 4. The 4 Key Functions (How User Actions Work)

When asked: *"How do your buttons and interactions work?"*, you can explain these 4 simple functions:

### 1. `handleFeed(animalId)`
- **Purpose**: Feeds an animal to restore its hunger/fullness.
- **How it works**:
  1. It loops through the `animals` array using `.map()`.
  2. When it finds the matching `animalId`, it increases `animal.hunger` by `+20` (capped at 100 using `Math.min`).
  3. It calls `speakText()` to announce that the animal enjoyed the food.
  4. It updates state using `setAnimals()`.

### 2. `handlePlay(animalId)`
- **Purpose**: Plays with an animal to increase its happiness.
- **How it works**:
  1. Finds the matching animal by `id`.
  2. Increases its `happiness` by `+20` (capped at 100).
  3. Uses speech synthesis to announce the animal had fun.
  4. Updates state using `setAnimals()`.

### 3. `handleSpeak(animal)`
- **Purpose**: Makes the animal speak its sound out loud.
- **How it works**:
  - Uses the native browser `window.speechSynthesis` API:
    ```javascript
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(animal.sound));
    ```
  - **Advantage**: It works 100% offline and requires zero heavy external audio files.

### 4. `handleAddAnimal(newAnimalData)`
- **Purpose**: Adds a new animal created in the modal to the sanctuary.
- **How it works**:
  1. Gives the new animal a unique `id` (`animals.length + 1`).
  2. Adds the new animal to the list using the spread operator: `[...prevList, newAnimal]`.
  3. Automatically updates the UI and speaks a welcome greeting.

---

## 5. Live Simulation (Automatic Hunger Drop)

In `App.jsx`, there is a `useEffect` hook with a timer:
```javascript
useEffect(() => {
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
```
- **Explanation**: Every 15 seconds, each animal's hunger drops by 3%. This simulates real-life hunger and gives the user an ongoing reason to interact with and care for the animals!

---

## 6. How Electron Makes It a Desktop App

- **`app/app.js`**:
  - Electron creates a native desktop window using `new BrowserWindow({ width: 1240, height: 840 })`.
  - It loads the built React HTML file (`dist/index.html`) or the development server (`http://localhost:5173`).
  - This packages the web technology (HTML, CSS, React) into a standalone desktop application.

---

## 7. Quick Viva Q&A (Frequently Asked Questions)

**Q: Why did you use React for this application?**  
*A: React makes building interactive UIs easy by managing state and automatically re-rendering components when data changes (e.g., when an animal's hunger or happiness updates).*

**Q: How do components communicate with each other?**  
*A: Through React **Props**. For example, `App.jsx` passes each animal's data and handler functions (`onFeed`, `onPlay`) down to `AnimalCard.jsx`.*

**Q: How did you implement animal sounds?**  
*A: We used the native JavaScript Web Speech API (`window.speechSynthesis`). It speaks custom lines for each animal without needing bulky MP3 downloads.*

**Q: How does the habitat filter work?**  
*A: When a user clicks a habitat tab, `selectedHabitat` state updates. A simple JavaScript `.filter()` check renders only animals matching that habitat.*
