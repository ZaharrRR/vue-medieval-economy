<template>
  <div class="flex justify-between p-4 gap-5 bg-[#333] text-white min-h-screen">
    <div class="flex flex-col gap-4 w-[75%]">
      <div class="flex items-center gap-3">
        <span class="font-bold text-xl">Town Market</span>
        <span class="text-yellow-400">{{ town.budget.toFixed(2) }}g</span>

        <Multiplier v-model="multiplier" />
      </div>

      <div
        v-for="(category, index) in [
          sortedFood,
          sortedMaterials,
          sortedManufactured,
        ]"
        :key="index"
      >
        <div class="flex gap-3 py-2 overflow-x-auto">
          <div v-for="(good, index) in category" :key="index">
            <GoodsCard
              :good="good"
              :multiplier="multiplier"
              @buy="buyItem"
              @sell="sellItem"
            />
          </div>
        </div>
      </div>
    </div>

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
    <div>
      <div v-for="town in TownStore.getVillages" :key="town.id">
        <div>{{ town.name }}</div>
        <div class="text-yellow-400">{{ town.budget }}</div>
        <button
          @click="TownStore.setGold(town.budget - 10, town.id)"
          class="bg-gray-600"
        >
          уменьшить бюджет на 10
        </button>
        <button @click="TownStore.deleteTown(town.id)" class="bg-red-400">
          удалить
        </button>
      </div>
      <div class="text-yellow-400 mt-5">{{ TownStore.getCountGold }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import GoodsCard from "../components/Market/GoodsCard.vue";
import Multiplier from "../components/Market/Multiplier.vue";

import { formateDays } from "../utils/formatDays";

import { useTownStore } from "../stores/TownStore";

const TownStore = useTownStore();

const multiplier = ref(1);
const day = ref(1);

const town = ref({
  id: "0",
  wealth: 21,
  budget: 374,
  tax: 0.1,
  population: [],
  goods: [],
});

const me = ref({
  money: 160,
  name: "Zahar Pagrebus",
  goods: [],
});

const goods = ref([
  {
    name: "berryes",
    category: "food",
    unit: "L",
    avgPrice: 1.5,
    weight: 0.6,
    volume: 1,
    necessity: 40,
    consumption: 2,
  },
  {
    name: "bread",
    category: "food",
    unit: "kg",
    avgPrice: 2,
    weight: 1,
    volume: 2,
    necessity: 90,
    consumption: 7,
  },
  {
    name: "meat",
    category: "food",
    unit: "kg",
    avgPrice: 10,
    weight: 1,
    volume: 1,
    necessity: 70,
    consumption: 4,
  },
  {
    name: "fish",
    category: "food",
    unit: "L",
    avgPrice: 7,
    weight: 0.5,
    volume: 1,
    necessity: 80,
    consumption: 3,
  },
  {
    name: "vegetables",
    category: "food",
    unit: "L",
    avgPrice: 3,
    weight: 0.3,
    volume: 1,
    necessity: 90,
    consumption: 8,
  },
  {
    name: "wood",
    category: "materials",
    unit: "m3",
    avgPrice: 15,
    weight: 560,
    volume: 1000,
    necessity: 60,
    consumption: 0.5,
  },
  {
    name: "clay",
    category: "materials",
    unit: "m3",
    avgPrice: 2,
    weight: 900,
    volume: 1000,
    necessity: 30,
    consumption: 0.2,
  },
  {
    name: "iron",
    category: "materials",
    unit: "kg",
    avgPrice: 20,
    weight: 1,
    volume: 0.5,
    necessity: 10,
    consumption: 0.1,
  },
  {
    name: "furniture",
    category: "manufactured",
    unit: "pc",
    avgPrice: 100,
    weight: 20,
    volume: 50,
    necessity: 50,
    consumption: 0.1,
  },
]);

const groups = ref([
  {
    id: "7635635453",
    people: 78,
    type: "peasants",
    happiness: 47,
    education: 13,
  },
  {
    id: "76457u6544",
    people: 11,
    type: "laborers",
    happiness: 31,
    education: 24,
  },
  {
    id: "457654g234",
    people: 7,
    type: "clergymen",
    happiness: 68,
    education: 57,
  },
  {
    id: "654hnf4135",
    people: 2,
    type: "aristocrats",
    happiness: 85,
    education: 41,
  },
  {
    id: "4234hgf642",
    people: 6,
    type: "merchants",
    happiness: 67,
    education: 43,
  },
]);

const sortedFood = computed(() => {
  return town.value.goods.filter((good) => good.type.category === "food");
});

const sortedMaterials = computed(() => {
  return town.value.goods.filter((good) => good.type.category === "materials");
});

const sortedManufactured = computed(() => {
  return town.value.goods.filter(
    (good) => good.type.category === "manufactured"
  );
});

const generateGoods = () => {
  town.value.goods = goods.value.map((good) => {
    return {
      type: good,
      amount: Math.floor(Math.random() * 100),
      price: good.avgPrice * (town.value.wealth / 100 + 0.5),
    };
  });
};

function buyItem(item) {
  const itemIndex = town.value.goods.findIndex(
    (good) => good.type === item.type
  );

  const price = item.price * multiplier.value;
  const amount = multiplier.value;

  if (
    itemIndex !== -1 &&
    me.value.money >= price &&
    town.value.goods[itemIndex].amount >= amount
  ) {
    town.value.goods[itemIndex].amount -= amount;
    town.value.budget += price;
    me.value.money -= price;

    const playerItem = me.value.goods.find((good) => good.type === item.type);

    if (playerItem) {
      playerItem.amount += amount;
    } else {
      me.value.goods.push({ type: item.type, amount: amount });
    }
    day.value++;
  } else {
    alert("Недостаточно денег или товара закончился.");
  }
}

function sellItem(item) {
  const playerItemIndex = me.value.goods.findIndex(
    (good) => good.type === item.type
  );

  const price = item.price * multiplier.value;
  const amount = multiplier.value;

  if (
    playerItemIndex !== -1 &&
    me.value.goods[playerItemIndex].amount >= amount
  ) {
    me.value.goods[playerItemIndex].amount -= amount;

    const taxAmount = price * town.value.tax;
    me.value.money += price - taxAmount;
    town.value.budget += taxAmount;

    const townItemIndex = town.value.goods.findIndex(
      (good) => good.type === item.type
    );
    if (townItemIndex !== -1) {
      town.value.goods[townItemIndex].amount += amount;
      town.value.budget -= price;
    }
    day.value++;
  } else {
    alert("У вас нет этого предмета в инвентаре.");
  }
}

onMounted(() => {
  generateGoods();
});
</script>

<style scoped></style>
