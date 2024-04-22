<template>
  <div class="p-4 flex flex-col gap-3">
    <div class="flex gap-3">
      <div>
        <span class="text-sm italic">you can select city by click</span>
        <div id="grid">
          <div v-for="(x, index1) in gridSize.width + 1" :key="index1">
            <div v-for="(y, index2) in gridSize.height + 1" :key="index2">
              <div
                class="cell relative"
                :class="{
                  'has-town': hasTown(index1, index2),
                  selected: isTownSelected(index1, index2),
                }"
                @click="showTown(index1, index2)"
              >
                <span
                  v-if="hasTown(index1, index2)"
                  class="text-xs italic stroke-inherit absolute text-slate-400 translate-y-4 translate-x-4 z-10"
                  >{{ getTownName(index1, index2) }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentTown" class="flex justify-between w-full">
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
            <p>wealth: {{ currentTown.wealth.toFixed(2) }}</p>
            <p>tax: {{ (currentTown.tax * 100).toFixed(2) + "%" }}</p>
          </div>
        </div>

        <button
          class="bg-[#444444] hover:bg-[#474747] rounded p-1 px-3 text-lg font-bold h-fit"
        >
          To town
        </button>
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
              <button @click="setTown(town.value.id)" class="w-full text-start">
                {{ town.value.name }}
              </button>
            </td>
            <td>{{ town.value.type }}</td>
            <td class="text-yellow-400">
              {{ town.value.budget.toFixed(0) + "g" }}
            </td>
            <td>{{ town.value.wealth.toFixed(0) }}</td>
            <td>{{ (town.value.tax * 100).toFixed(2) + "%" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { generateTowns } from "../utils/generateTown";
import { gridSize } from "../utils/generateCoordinates";

const towns = generateTowns(10);

const currentTown = ref();

const hasTown = (x, y) => {
  return towns.some(
    (town) => town.value.coordinates.x === x && town.value.coordinates.y === y
  );
};

const showTown = (x, y) => {
  const town = towns.find(
    (town) => town.value.coordinates.x === x && town.value.coordinates.y === y
  );
  if (town) {
    currentTown.value = town.value;
  }
};

const setTown = (id) => {
  const town = towns.find((town) => town.value.id === id);
  if (town) {
    currentTown.value = town.value;
  }
};

const getTownName = (x, y) => {
  const town = towns.find(
    (town) => town.value.coordinates.x === x && town.value.coordinates.y === y
  );
  return town ? town.value.name : "";
};

const isTownSelected = (x, y) => {
  return (
    currentTown.value &&
    currentTown.value.coordinates.x === x &&
    currentTown.value.coordinates.y === y
  );
};
</script>

<style scoped>
#grid {
  display: grid;
  grid-template-columns: repeat(21, 20px);
  grid-template-rows: repeat(21, 20px);
  border: 1px solid #000;
  padding: 4px;
}

.cell {
  width: 20px;
  height: 20px;
  box-sizing: border-box;
}

.has-town {
  background-color: #f0f0f0;
  border-radius: 50%;
  cursor: pointer;
}

.has-town.selected {
  background-color: #ff0;
}

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
