import { ref } from "vue";
import { nanoid } from "nanoid";

const groupTypes = [
  "peasants",
  "labores",
  "clergymen",
  "aristocrats",
  "merchants",
];

const generateGroup = () => {
  const group = ref({
    id: nanoid(),
    type: getRandomTownType(),
    wealth: 0,
    budget: 0,
    tax: Math.random() * 0.1 + 0.05,
    coordinates: generateUniqueCoordinates(),
    goods: [],
    population: [],
  });

  town.value.wealth = generateWealth(town.value.type);
  town.value.budget = generateBudget(town.value.type);

  return town.value;
};
