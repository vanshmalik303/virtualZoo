// src/data/animals.js
// This file stores the initial animal data and habitat categories.

export const HABITATS = ['All', 'Savannah', 'Jungle', 'Arctic', 'Ocean'];

export const INITIAL_ANIMALS = [
  {
    id: 1,
    name: 'Leo',
    species: 'Lion',
    emoji: '🦁',
    habitat: 'Savannah',
    hunger: 70,     // 0 = starving, 100 = completely full
    happiness: 85,  // 0 = sad, 100 = very happy
    funFact: 'Lions sleep up to 20 hours a day to save energy.'
  },
  {
    id: 2,
    name: 'Ellie',
    species: 'Elephant',
    emoji: '🐘',
    habitat: 'Savannah',
    hunger: 60,
    happiness: 90,
    funFact: 'Elephants are the largest land animals on Earth.'
  },
  {
    id: 3,
    name: 'Coco',
    species: 'Monkey',
    emoji: '🐒',
    habitat: 'Jungle',
    hunger: 80,
    happiness: 75,
    funFact: 'Monkeys use their tails for balance when leaping through trees.'
  },
  {
    id: 4,
    name: 'Raja',
    species: 'Tiger',
    emoji: '🐯',
    habitat: 'Jungle',
    hunger: 55,
    happiness: 80,
    funFact: 'Every tiger has a unique pattern of stripes like human fingerprints.'
  },
  {
    id: 5,
    name: 'Pippin',
    species: 'Penguin',
    emoji: '🐧',
    habitat: 'Arctic',
    hunger: 75,
    happiness: 95,
    funFact: 'Penguins cannot fly in the air, but they fly underwater!'
  },
  {
    id: 6,
    name: 'Barnaby',
    species: 'Polar Bear',
    emoji: '🐻‍❄️',
    habitat: 'Arctic',
    hunger: 65,
    happiness: 70,
    funFact: 'A polar bear’s skin under its white fur is actually black.'
  },
  {
    id: 7,
    name: 'Echo',
    species: 'Dolphin',
    emoji: '🐬',
    habitat: 'Ocean',
    hunger: 90,
    happiness: 90,
    funFact: 'Dolphins use echolocation to navigate and hunt fish.'
  },
  {
    id: 8,
    name: 'Crush',
    species: 'Sea Turtle',
    emoji: '🐢',
    habitat: 'Ocean',
    hunger: 80,
    happiness: 85,
    funFact: 'Sea turtles can live for over 80 years in the ocean.'
  }
];
