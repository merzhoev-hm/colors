<script setup>
import { ref, onMounted, watch } from "vue";
import ProductFilterItem from "./ProductFilterItem.vue";
import CustomSelect from "./CustomSelect.vue";
import ProductCard from "./ProductCard.vue";
import { useCardStore } from "@/stores/ProductCardStore";
import { useCartStore } from "@/stores/CartProductStore";

const cardStore = useCardStore();
const cartStore = useCartStore();
const isFilterMenu = ref(false);
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

const filterMenuOpen = () => {
  isFilterMenu.value = true;
  document.body.style.paddingRight =
    window.innerWidth - document.documentElement.clientWidth + "px";
  document.body.classList.add("overflow-hidden");
};

const filterMenuClose = () => {
  isFilterMenu.value = false;
  document.body.style.paddingRight = "";
  document.body.classList.remove("overflow-hidden");
};

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
    <div v-if="isFilterMenu">
      <div @click="filterMenuClose" class="product__filter-menu-bg"></div>
      <form class="product__filter-menu">
        <span @click="filterMenuClose"></span>
        <ProductFilterItem
          v-for="item in filterItems"
          :key="item.id"
          :item="item"
        />
      </form>
    </div>
    <div class="product__list-path">
      <p>Главная - Продукты - Краски</p>
      <h2>Краски</h2>
    </div>
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
          <button @click="filterMenuOpen">Фильтры</button>
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

.product__controls button {
  font-size: 12px;
  font-weight: 500;
  line-height: 14.52px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.product__controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 44px;
  align-items: center;
}

.product__controls button {
  display: none;
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

.product__list-path {
  flex-direction: column;
  gap: 48px;
  display: none;
}

.product__list-path p {
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 0.06em;
  opacity: 30%;
}

.product__list-path h2 {
  font-size: 36px;
  font-weight: 400;
  line-height: 31.68px;
  letter-spacing: -0.04em;
}

.product__filter-menu {
  display: flex;

  flex-direction: column;
  gap: 10px;
  position: fixed;
  background-color: #fff;
  z-index: 5;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  top: 170px;
  padding-left: 24px;
  padding-top: 54px;
  border-radius: 24px 24px 0px 0px;
}

.product__filter-menu span {
  cursor: pointer;
  width: 28px;
  height: 4px;
  border-radius: 40px;
  opacity: 0.6;
  background: rgba(31, 32, 32, 1);
  align-self: center;
  position: absolute;
  top: 15px;
}

.product__filter-menu-bg {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
}

@media screen and (max-width: 980px) {
  .product__count,
  .product__filter {
    display: none;
  }

  .product__controls button {
    display: block;
  }
}

@media screen and (max-width: 768px) {
  .product__list {
    gap: 59px 15px;
  }

  .product__list-path {
    display: flex;
  }

  .product__container {
    padding: 48px 0 64px;
  }
}

@media screen and (max-width: 545px) {
  .product__list {
    justify-content: center;
  }
}
</style>
