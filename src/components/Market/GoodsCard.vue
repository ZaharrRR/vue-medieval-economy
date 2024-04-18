<template>
  <div
    class="flex flex-col shadow-lg gap-3 p-2 rounded bg-[#444444] bg-opacity-50"
  >
    <div class="flex gap-4 text-white">
      <span class="font-bold">{{ props.good.type.name }}</span>
      <span class="text-yellow-400"
        >{{ (props.good.price * multiplier).toFixed(2) }}g</span
      >
      <span class="text-xs italic">{{
        props.good.amount + good.type.unit
      }}</span>
    </div>

    <div class="flex gap-3 justify-between font-semibold text-black">
      <button
        class="bg-green-300 hover:bg-green-400 p-1 px-3 rounded"
        @click="$emit('buy', props.good)"
      >
        buy
      </button>
      <button
        class="bg-red-300 hover:bg-red-400 p-1 px-3 rounded"
        @click="$emit('sell', props.good)"
      >
        sell
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  good: Object,
  multiplier: Number,
});

const emit = defineEmits(["buy", "sell"]);
</script>

<style scoped></style>
