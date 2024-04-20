<template>
  <div class="bg-[#444444] rounded h-fit p-3 min-w-60">
    <div>
      <p>{{ me.name }}</p>
      <p>{{ formateDays(day) }}</p>
      <p class="text-yellow-400">
        <span class="text-white">cash:</span> {{ me.money.toFixed(2) }}g
      </p>
    </div>

    <div class="mt-3">
      <span>goods:</span>
      <div v-for="(good, index) in me.goods" :key="index">
        <div v-if="good.amount">
          <span>{{ good.type.name + ": " }}</span>
          <span class="text-sm">{{ good.amount + good.type.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formateDays } from "";

const props = defineProps({
  me: Object,
});

const day = ref(0);
</script>

<style scoped></style>
