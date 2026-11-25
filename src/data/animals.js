// src/data/animals.js
// This file stores the initial animal data and habitat categories.

export const HABITATS = ['All', 'Savannah', 'Jungle', 'Arctic', 'Ocean'];

export const INITIAL_ANIMALS = [
  {
    id: 1,
    name: 'Leo',
    species: 'Lion',
    scientificName: 'Panthera leo',
    image: './animals/lion.jpg',
    emoji: '🦁',
    habitat: 'Savannah',
    habitatDescription: 'Open grasslands, savannahs, and woodlands of sub-Saharan Africa. Lions prefer vast territories with scattered trees for shade and cover.',
    hunger: 70,
    happiness: 85,
    rarity: 'Vulnerable',
    populationLeft: '~23,000',
    diet: 'Carnivore',
    lifespan: '10–14 years (wild)',
    weight: '150–250 kg',
    funFact: 'Lions sleep up to 20 hours a day to save energy.',
    facts: [
      'A lion\'s roar can be heard from up to 8 km (5 miles) away.',
      'Lions are the only cats that live in social groups called prides.',
      'Female lions do about 90% of the hunting for the pride.',
      'A male lion\'s mane darkens with age, signaling dominance.'
    ]
  },
  {
    id: 2,
    name: 'Ellie',
    species: 'Elephant',
    scientificName: 'Loxodonta africana',
    image: './animals/elephant.jpg',
    emoji: '🐘',
    habitat: 'Savannah',
    habitatDescription: 'Grasslands, forests, and marshes across sub-Saharan Africa. Elephants roam vast distances to find water and food.',
    hunger: 60,
    happiness: 90,
    rarity: 'Endangered',
    populationLeft: '~415,000',
    diet: 'Herbivore',
    lifespan: '60–70 years',
    weight: '4,000–6,000 kg',
    funFact: 'Elephants are the largest land animals on Earth.',
    facts: [
      'Elephants communicate using low-frequency rumbles that travel through the ground.',
      'They mourn their dead and revisit the bones of deceased family members.',
      'An elephant\'s trunk has over 40,000 muscles and can lift 300 kg.',
      'Baby elephants suck their trunks for comfort, like human babies suck their thumbs.'
    ]
  },
  {
    id: 3,
    name: 'Coco',
    species: 'Monkey',
    scientificName: 'Cebus capucinus',
    image: './animals/monkey.jpg',
    emoji: '🐒',
    habitat: 'Jungle',
    habitatDescription: 'Tropical and subtropical rainforests of Central and South America. Monkeys thrive in the canopy layer with dense foliage.',
    hunger: 80,
    happiness: 75,
    rarity: 'Least Concern',
    populationLeft: '~500,000+',
    diet: 'Omnivore',
    lifespan: '15–25 years',
    weight: '3–9 kg',
    funFact: 'Monkeys use their tails for balance when leaping through trees.',
    facts: [
      'Capuchin monkeys are one of the most intelligent New World monkeys.',
      'They use tools like rocks to crack open nuts and shellfish.',
      'Monkeys can recognize themselves in mirrors — a sign of self-awareness.',
      'Some species have been observed washing food in streams before eating.'
    ]
  },
  {
    id: 4,
    name: 'Raja',
    species: 'Tiger',
    scientificName: 'Panthera tigris',
    image: './animals/tiger.jpg',
    emoji: '🐯',
    habitat: 'Jungle',
    habitatDescription: 'Dense tropical forests, mangrove swamps, and grasslands of Asia. Tigers are solitary and require vast territories.',
    hunger: 55,
    happiness: 80,
    rarity: 'Endangered',
    populationLeft: '~4,500',
    diet: 'Carnivore',
    lifespan: '10–15 years (wild)',
    weight: '90–310 kg',
    funFact: 'Every tiger has a unique pattern of stripes like human fingerprints.',
    facts: [
      'Tigers are strong swimmers and love to cool off in rivers and pools.',
      'A tiger\'s night vision is 6 times better than a human\'s.',
      'They can eat up to 40 kg of meat in a single meal.',
      'Unlike most cats, tigers are ambush predators that hunt alone.'
    ]
  },
  {
    id: 5,
    name: 'Pippin',
    species: 'Penguin',
    scientificName: 'Aptenodytes forsteri',
    image: './animals/penguin.jpg',
    emoji: '🐧',
    habitat: 'Arctic',
    habitatDescription: 'Antarctic ice sheets, sub-Antarctic islands, and cold coastal waters. Penguins breed in vast colonies on ice shelves.',
    hunger: 75,
    happiness: 95,
    rarity: 'Near Threatened',
    populationLeft: '~600,000',
    diet: 'Piscivore',
    lifespan: '15–20 years',
    weight: '22–45 kg',
    funFact: 'Penguins cannot fly in the air, but they fly underwater!',
    facts: [
      'Emperor penguins can dive to depths of over 500 meters.',
      'Male emperor penguins incubate eggs on their feet for 2 months without eating.',
      'Penguins have a gland that filters salt from seawater so they can drink it.',
      'They can hold their breath underwater for up to 20 minutes.'
    ]
  },
  {
    id: 6,
    name: 'Barnaby',
    species: 'Polar Bear',
    scientificName: 'Ursus maritimus',
    image: './animals/polarbear.jpg',
    emoji: '🐻‍❄️',
    habitat: 'Arctic',
    habitatDescription: 'Arctic sea ice, tundra, and coastal regions around the North Pole. They depend on sea ice for hunting seals.',
    hunger: 65,
    happiness: 70,
    rarity: 'Vulnerable',
    populationLeft: '~22,000–31,000',
    diet: 'Carnivore',
    lifespan: '25–30 years',
    weight: '350–700 kg',
    funFact: 'A polar bear\'s skin under its white fur is actually black.',
    facts: [
      'Polar bear fur is not white — each hair is a hollow, transparent tube.',
      'They can swim continuously for over 100 km in icy Arctic waters.',
      'Their sense of smell is so strong they can detect a seal 1.6 km away.',
      'Polar bears are classified as marine mammals due to their dependence on the ocean.'
    ]
  },
  {
    id: 7,
    name: 'Echo',
    species: 'Dolphin',
    scientificName: 'Tursiops truncatus',
    image: './animals/dolphin.jpg',
    emoji: '🐬',
    habitat: 'Ocean',
    habitatDescription: 'Warm and temperate oceans worldwide, coastal bays, and estuaries. Dolphins are highly social and travel in pods.',
    hunger: 90,
    happiness: 90,
    rarity: 'Least Concern',
    populationLeft: '~600,000+',
    diet: 'Piscivore',
    lifespan: '40–50 years',
    weight: '150–650 kg',
    funFact: 'Dolphins use echolocation to navigate and hunt fish.',
    facts: [
      'Dolphins sleep with one eye open — literally. Half their brain stays awake.',
      'Each dolphin has a unique signature whistle used to identify themselves.',
      'They have been observed using sponges on their snouts to protect them while foraging.',
      'Dolphins can leap up to 6 meters (20 feet) out of the water.'
    ]
  },
  {
    id: 8,
    name: 'Crush',
    species: 'Sea Turtle',
    scientificName: 'Chelonia mydas',
    image: './animals/seaturtle.jpg',
    emoji: '🐢',
    habitat: 'Ocean',
    habitatDescription: 'Tropical and subtropical oceans, coral reefs, and seagrass beds worldwide. Sea turtles migrate thousands of miles between feeding and nesting grounds.',
    hunger: 80,
    happiness: 85,
    rarity: 'Endangered',
    populationLeft: '~85,000 nesting females',
    diet: 'Herbivore',
    lifespan: '80+ years',
    weight: '65–130 kg',
    funFact: 'Sea turtles can live for over 80 years in the ocean.',
    facts: [
      'Sea turtles return to the exact same beach where they were born to lay eggs.',
      'The temperature of the sand determines the sex of sea turtle hatchlings.',
      'They have been around for over 100 million years — older than dinosaurs.',
      'Green sea turtles can hold their breath for up to 5 hours while sleeping.'
    ]
  }
];
