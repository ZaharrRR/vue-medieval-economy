import { defineStore } from "pinia";

export const useMovieStore = defineStore("townStore", {
  state: () => ({
    movies: [
      {
        id: "0",
        population: 47,
        wealth: 21,
        budget: 374,
        tax: 0.1,
        goods: [],
      },
    ],
  }),
});
