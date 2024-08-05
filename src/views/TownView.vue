<template>
  <div v-if="town" class="p-4 flex flex-col gap-4">
    <div class="flex gap-3 items-end">
      <h2 class="text-2xl">{{ town.name }}</h2>
      <span>{{ town.type }}</span>
    </div>

    <div>
      <h2 class="text-xl font-bold">info</h2>
      <p>budget: {{ town.budget.toFixed(2) }}g</p>
      <p>wealth: {{ (town.wealth * 100).toFixed(2) }}%</p>
      <p>tax: {{ (town.tax * 100).toFixed(2) }}%</p>
    </div>

    <div>
      <h2 class="text-xl font-bold">groups</h2>
      <div v-for="group in town.groups" :key="group.id">
        <span
          >{{ group.name }} - {{ group.size }} men
          {{ group.gold.toFixed(2) }}g</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useRoute } from "vue-router";

import { useTownStore } from "@/stores/TownStore";

const route = useRoute();
const townId = route.params.id;

const townStore = useTownStore();

const town = ref();

onMounted(() => {
  town.value = townStore.getTown(townId);
});
</script>

<style scoped></style>
