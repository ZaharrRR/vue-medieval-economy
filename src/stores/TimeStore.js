import { defineStore } from "pinia";

export const useTimeStore = defineStore("timeStore", {
  state: () => ({
    days: 0,
    isPause: false,
  }),
  actions: {
    pause() {
      this.isPause = !this.isPause;
    },

    addDay() {
      if (!this.isPause) {
        this.days++;
      }
    },
  },
});
