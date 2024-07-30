<template>
  <div class="relative h-screen flex overflow-hidden bg-[#333] text-white">
    <aside
      :class="{
        'absolute inset-y-0 left-0 w-1 h-full bg-[#292929]  text-white overflow-hidden transition-all duration-300 ease-in-out z-50':
          !isHovered,
        'absolute inset-y-0 left-0 w-64 h-full bg-[#292929] p-5 text-white overflow-hidden transition-all duration-300 ease-in-out z-50':
          isHovered,
      }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <nav class="flex flex-col gap-3" :class="{ hidden: !isHovered }">
        <RouterLink class="link" to="/">home</RouterLink>
        <RouterLink class="link" to="/towns">cities</RouterLink>
        <RouterLink class="link" to="/market">market</RouterLink>
      </nav>
    </aside>

    <div class="overflow-y-auto overflow-x-hidden w-full">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useTownStore } from "@/stores/TownStore";
import { useTimeStore } from "@/stores/TimeStore";

const TownStore = useTownStore();
const TimeStore = useTimeStore();

const isHovered = ref();

setInterval(() => {
  TimeStore.addDay();
}, 2500);

onMounted(() => {
  TownStore.generateTowns(20);
});
</script>

<style scoped>
.link {
  @apply hover:bg-[#474747] p-1 px-3 rounded-lg w-full  focus:bg-blue-400;
}
</style>
