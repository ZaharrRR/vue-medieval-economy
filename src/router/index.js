import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import MarketView from "../views/MarketView.vue";
import CitiesListView from "../views/CitiesListView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: HomeView,
    },
    {
      name: "Cities",
      path: "/cities",
      component: CitiesListView,
    },
    {
      name: "Market",
      path: "/market",
      component: MarketView,
    },
  ],
});
