import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import MarketView from "../views/MarketView.vue";
import CitiesListView from "../views/CitiesListView.vue";
import TownView from "../views/TownView.vue";

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
      children: [
        {
          name: "Town",
          path: ":id",
          component: TownView,
        },
      ],
    },
    {
      name: "Market",
      path: "/market",
      component: MarketView,
    },
  ],
});
