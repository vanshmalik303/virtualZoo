# 🦁 Safari Haven — Virtual Zoo Sanctuary Desktop App

An interactive, responsive wildlife sanctuary desktop application built with **Electron**, **React 19**, and **Vite**.

---

## ✨ Features

- **5 Wildlife Habitats**:
  - 🦁 **African Savannah**: Lion, African Elephant, Plains Zebra, Giraffe
  - 🌴 **Tropical Rainforest**: Bengal Tiger, Giant Panda, Capuchin Monkey, Keel-billed Toucan
  - ❄️ **Arctic Tundra**: Emperor Penguin, Polar Bear, Harp Seal, Arctic Fox
  - 🌊 **Ocean Lagoon**: Bottlenose Dolphin, Green Sea Turtle, Clownfish, Great White Shark
  - 🦜 **Sky Sanctuary (Aviary)**: Scarlet Macaw, Barn Owl, Golden Eagle, Greater Flamingo
- **Interactive Animal Care**:
  - **Feed**: Instant feed or open the Keeper's Feeding Tray to feed specific foods (meat, fruit, fish, bamboo, seeds, insects) matching their dietary preferences.
  - **Pet & Play**: Real-time love and energy boost with bounce animations.
  - **Clean Habitat**: Maintain hygiene in enclosures.
  - **Procedural Sound Engine**: Web Audio API audio synthesis for animal roars, bird chirps, dolphin clicks, feeding crunch, and petting chimes without external audio dependencies.
- **Wildlife Education & Trivia**:
  - Scientific names, conservation status tags (Critically Endangered, Endangered, Vulnerable, Least Concern), diet categories, and fascinating fun facts for every animal.
- **Zoo Keeper Economy**:
  - Earn Zoo Coins from happy sanctuary visitors.
  - Overall sanctuary happiness and visitor tracker.
- **Adopt New Animals**:
  - Adopt new endangered or popular species into any habitat.
  - Custom naming with a random name generator.
- **Atmosphere & Cycle**:
  - Day ☀️, Sunset 🌅, and Night 🌙 cycles with dynamic lighting and sleeping states.
  - Procedural background ambient nature sound with mute controls.
- **Desktop Native Integration**:
  - Electron window with native OS alerts when an animal is critically hungry.
  - LocalStorage persistence so animal stats and coins are saved across sessions.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Browser (Fast Development)
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run as Native Desktop App (Electron)
In one command:
```bash
npm start
```
*(This builds the production bundle and launches the Electron desktop application window).*

Or, during active development with Hot Module Replacement (HMR):
```bash
# Terminal 1:
npm run dev

# Terminal 2:
npm run electron
```

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite 8
- **Desktop Runtime**: Electron 44
- **Audio**: Web Audio API Procedural Synthesizer
- **Styling**: Modern CSS3 (Glassmorphism, CSS Grid, Fluid Typography, Dynamic Color Schemes)
