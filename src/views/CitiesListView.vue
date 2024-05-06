<template>
  <div class="p-4 flex flex-col gap-3">
    <div class="flex gap-3">
      <div>
        <span class="text-sm italic">you can select city by click</span>
        <MapGrid />
      </div>

      <div v-if="currentTown" class="flex gap-3 w-full">
        <div>
          <span class="text-sm italic">selected town</span>
          <div v-if="currentTown" class="bg-[#444444] p-3 rounded">
            <p>name: {{ currentTown.name }}</p>
            <p>type: {{ currentTown.type }}</p>
            <p>
              budget:
              <span class="text-yellow-400"
                >{{ currentTown.budget.toFixed(2) }}g</span
              >
            </p>
            <p>wealth: {{ (currentTown.wealth * 100).toFixed(1) }}</p>
            <p>tax: {{ (currentTown.tax * 100).toFixed(2) + "%" }}</p>
          </div>
        </div>

        <RouterLink :to="`/cities/:${currentTown.id}`">
          <button
            class="bg-[#444444] hover:bg-[#474747] rounded p-1 px-3 mt-6 text-lg font-bold h-fit"
          >
            To town
          </button>
        </RouterLink>
      </div>
    </div>

    <div>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th>name</th>
            <th>type</th>
            <th>budget</th>
            <th>wealth</th>
            <th>tax</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(town, index) in towns" :key="index">
            <td>
              <button @click="setTown(town.id)" class="w-full text-start">
                {{ town.name }}
              </button>
            </td>
            <td>{{ town.type }}</td>
            <td class="text-yellow-400">
              {{ town.budget.toFixed(0) + "g" }}
            </td>
            <td>{{ (town.wealth * 100).toFixed(1) }}</td>
            <td>{{ (town.tax * 100).toFixed(2) + "%" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { gridSize } from "../utils/generateCoordinates";
import { RouterLink } from "vue-router";

import { useTownStore } from "../stores/TownStore";

const TownStore = useTownStore();

const towns = TownStore.getTowns;

const currentTown = ref();

const setTown = (id) => {
  const town = towns.find((town) => town.id === id);
  if (town) {
    currentTown.value = town;
  }
};
</script>

<style scoped>
tr {
  @apply bg-[#414141] border-y border-[#525252];
}

td {
  @apply border-e border-[#525252] p-1;
}

td:last-of-type {
  @apply border-0;
}
</style>
