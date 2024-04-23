import { defineStore } from "pinia";

import { generateTowns } from "../utils/generateTown";

export const useTownStore = defineStore("townStore", {
  state: () => ({
    towns: [],
  }),
  getters: {
    getTowns() {
      return this.towns;
    },
    getVillages() {
      return this.towns.filter((town) => town.type === "village");
    },
    getCountGold() {
      let summ = 0;

      this.towns.forEach((town) => {
        summ += town.budget;
      });

      return summ;
    },
  },
  actions: {
    async generateTowns(amount) {
      this.towns = generateTowns(amount);
    },
    async setGold(amount, id) {
      const town = this.towns.find((town) => town.id == id);
      town.budget = amount;
    },
    async deleteTown(id) {
      this.towns = this.towns.filter((town) => town.id !== id);
    },
  },
});
