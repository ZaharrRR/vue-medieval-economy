import { defineStore } from "pinia";

import { generateGroups } from "@/utils/generateGroup";

export const useTownStore = defineStore("townStore", {
  state: () => ({
    groups: [],
  }),
  getters: {},
  actions: {},
});
