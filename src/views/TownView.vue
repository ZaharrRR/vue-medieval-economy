<template>
  <div v-if="town" class="p-4">
    <div v-for="group in town.groups" :key="group.id">{{ group }}</div>
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
