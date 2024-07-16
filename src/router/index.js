import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import MarketView from "@/views/MarketView.vue";
import TownsListView from "@/views/TownsListView.vue";
import TownView from "@/views/TownView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: HomeView,
    },
    {
      name: "Towns",
      path: "/towns",
      component: TownsListView,
    },
    {
      name: "Town",
      path: "/towns/:id",
      component: TownView,
    },
    {
      name: "Market",
      path: "/market",
      component: MarketView,
    },
  ],
});
