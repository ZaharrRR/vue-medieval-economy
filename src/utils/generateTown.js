import { nanoid } from "nanoid";

import { generateUniqueCoordinates } from "@/utils/generateCoordinates";

import { townTypes, townNames, groupTypes } from "@/consts";

function getRandomTownType() {
  const randomNumber = Math.random();
  let cumulativeProbability = 0;

  for (let i = 0; i < townTypes.length; i++) {
    cumulativeProbability += townTypes[i].spawnRate;
    if (randomNumber < cumulativeProbability) {
      return townTypes[i];
    }
  }
}

const generateTown = () => {
  const townType = getRandomTownType();

  let town = {
    id: nanoid(),
    name: randomNameGenerator(),
    type: townType.name,
    wealth: generateWealth(townType),
    budget: generateBudget(townType),
    tax: Math.random() * 0.1 + 0.05,
    coordinates: generateUniqueCoordinates(),
    goods: [],
    groups: generateGroups(townType),
    buildings: [],
  };

  return town;
};

const generateTowns = (count) => {
  let towns = [];
  for (let i = 0; i < count; i++) {
    towns.push(generateTown());
  }
  return towns;
};

const randomNameGenerator = () => {
  return townNames[Math.floor(Math.random() * townNames.length)];
};

function generateWealth(townType) {
  return Math.random() * (townType.avgWealth / 2) + townType.avgWealth;
}

function generateBudget(townType) {
  return Math.random() * (townType.avgBudget / 2) + townType.avgBudget;
}

function generateGroups(townType) {
  const population = Math.floor(
    Math.random() * (townType.avgPopulation / 2) + townType.avgPopulation
  );
  let groups = [];

  for (const groupName in townType.groupSpawnRate) {
    const groupType = groupTypes.find((g) => g.name === groupName);
    if (groupType) {
      const baseGroupSize = Math.floor(
        population * townType.groupSpawnRate[groupName]
      );

      const randomFactor = Math.random() * 0.2 - 0.1;
      const groupSize = Math.max(
        1,
        Math.floor(baseGroupSize * (1 + randomFactor))
      );

      if (groupSize > 0) {
        groups.push({
          id: nanoid(),
          name: groupName,
          size: groupSize,
          gold: groupSize * groupType.startGoldPerPerson,
        });
      }
    }
  }
  return groups;
}

export { generateTowns, generateTown };
