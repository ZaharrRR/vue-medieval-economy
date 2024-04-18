<template>
  <div class="relative h-screen flex overflow-hidden bg-[#333] text-white">
    <aside
      :class="{
        'absolute inset-y-0 left-0 w-1 h-full bg-[#292929]  text-white overflow-hidden transition-all duration-300 ease-in-out':
          !isHovered,
        'absolute inset-y-0 left-0 w-64 h-full bg-[#292929] p-5 text-white overflow-hidden transition-all duration-300 ease-in-out':
          isHovered,
      }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <nav class="flex flex-col gap-3" :class="{ hidden: !isHovered }">
        <RouterLink class="link" to="/">home </RouterLink>
        <RouterLink class="link" to="/market">market </RouterLink>
      </nav>
    </aside>

    <div class="overflow-y-auto w-full">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isHovered = ref();
</script>

<style scoped>
.link {
  @apply hover:bg-[#474747] p-1 px-3 rounded-lg w-full  focus:bg-blue-400;
}
</style>
