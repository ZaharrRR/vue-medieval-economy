import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import MarketView from "../views/MarketView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: HomeView,
    },
    {
      name: "Market",
      path: "/market",
      component: MarketView,
    },
  ],
});
