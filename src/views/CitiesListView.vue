<template>
  <div class="p-4 flex flex-col gap-3">
    <div class="flex gap-3">
      <div>
        <span class="text-sm italic">you can select city by click</span>
        <div id="grid">
          <div v-for="(x, index1) in gridSize.width + 1" :key="index1">
            <div v-for="(y, index2) in gridSize.height + 1" :key="index2">
              <div
                class="cell"
                :class="{
                  'has-town': hasTown(index1, index2),
                }"
                @click="showTown(index1, index2)"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentTown">
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
        </div>
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
            <th>coordinates</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(town, index) in towns" :key="index" class="text-center">
            <td>
              <button @click="setTown(town.value.id)">
                {{ town.value.name }}
              </button>
            </td>
            <td>{{ town.value.type }}</td>
            <td class="text-yellow-400">
              {{ town.value.budget.toFixed(1) + "g" }}
            </td>
            <td>{{ town.value.wealth.toFixed(1) + "%" }}</td>
            <td>{{ (town.value.tax * 100).toFixed(2) + "%" }}</td>
            <td>
              {{
                "(" +
                town.value.coordinates.x +
                "," +
                town.value.coordinates.y +
                ")"
              }}
            </td>
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

const towns = generateTowns(20);

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
</script>

<style scoped>
#grid {
  display: grid;
  grid-template-columns: repeat(21, 20px);
  grid-template-rows: repeat(21, 20px);
}

.cell {
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  box-sizing: border-box;
}

.has-town {
  background-color: #f0f0f0;
}

.town-name {
  position: absolute;
  background-color: #fff;
  border: 1px solid #000;
  padding: 2px;
  font-size: 12px;
}

tr {
  @apply bg-[#414141] border-y border-[#525252];
}
</style>
