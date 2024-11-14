<script setup>
import { ref, onMounted, watch } from "vue";
import ProductFilterItem from "./ProductFilterItem.vue";
import CustomSelect from "./CustomSelect.vue";
import ProductCard from "./ProductCard.vue";
import { useCardStore } from "@/stores/ProductCardStore";
import { useCartStore } from "@/stores/CartProductStore";

const cardStore = useCardStore();
const cartStore = useCartStore();
const filters = ref({
  sortBy: "name",
});

const filterItems = ref([
  { id: 1, name: "Новинки", type: "new" },
  { id: 2, name: "Есть в наличии", type: "instock" },
  { id: 3, name: "Контрактные", type: "contract" },
  { id: 4, name: "Эксклюзивные", type: "exclusive" },
  { id: 5, name: "Распродажа", type: "sale" },
]);

onMounted(async () => {
  await cardStore.fetchItems(filters.value);
  await cartStore.fetchCartItems();
});

watch(
  filters,
  () => {
    cardStore.fetchItems(filters.value);
  },
  { deep: true }
);
</script>

<template>
  <div class="container">
    <div class="product__container">
      <form class="product__filter">
        <ProductFilterItem
          v-for="item in filterItems"
          :key="item.id"
          :item="item"
        />
      </form>
      <div class="product__options">
        <div class="product__controls">
          <p class="product__count">{{ cardStore.itemsCounter }} товаров</p>

          <CustomSelect v-model="filters" />
        </div>
        <div class="product__list" v-auto-animate>
          <ProductCard
            v-for="item in cardStore.items"
            :key="item.id"
            :item="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product__container {
  padding: 72px 0 141px;

  display: flex;
  gap: 120px;
}

.product__filter {
  display: flex;
  flex-direction: column;

  gap: 10px;
  min-width: 169px;
}

.product__controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 44px;
  align-items: center;
}

.product__options {
  width: 100%;
}

.product__list {
  display: flex;
  flex-wrap: wrap;

  gap: 33px 20px;
}

.product__sort {
  border: none;
  outline: none;

  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.52px;
  letter-spacing: 0.06em;
}
</style>
