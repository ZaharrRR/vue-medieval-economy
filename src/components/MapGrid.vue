<template>
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
</template>

<script setup>
import { useTownStore } from "@/stores/TownStore";

const TownStore = useTownStore();

const towns = TownStore.getTowns;

const currentTown = defineModel();

const gridSize = {
  width: 20,
  height: 20,
};

const hasTown = (x, y) => {
  return towns.some(
    (town) => town.coordinates.x === x && town.coordinates.y === y
  );
};

const showTown = (x, y) => {
  const town = towns.find(
    (town) => town.coordinates.x === x && town.coordinates.y === y
  );
  if (town) {
    currentTown.value = town;
  }
};

const getTownName = (x, y) => {
  const town = towns.find(
    (town) => town.coordinates.x === x && town.coordinates.y === y
  );
  return town ? town.name : "";
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
</style>
