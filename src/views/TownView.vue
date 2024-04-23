<template>
  <div>{{ town.name }}</div>
</template>

<script setup>
const props = defineProps({
  town: {
    type: Object,
    required: true,
    default: () => {},
  },
});
</script>

<style scoped></style>
