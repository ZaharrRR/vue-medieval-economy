<template>
  <div class="inline-flex items-center rounded-md shadow-sm" role="group">
    <button class="rounded-s-lg" @click="model = 1">1x</button>
    <button @click="model = 5">5x</button>
    <button @click="model = 10">10x</button>
    <button class="rounded-e-lg" @click="model = 50">50x</button>

    <span class="px-3 font-bold">{{ model }}x</span>
  </div>
</template>

<script setup>
import { defineModel } from "vue";

const model = defineModel();
</script>

<style scoped>
button {
  @apply px-4 py-2 text-sm font-medium bg-[#444444] hover:bg-[#474747];
}
</style>
