<script setup>
import { useCartStore } from "@/stores/CartProductStore";

const cartStore = useCartStore();

defineProps({
  item: Object,
});
</script>

<template>
  <div class="card">
    <div class="card__img">
      <img :src="item.imageUrl" alt="" />
    </div>
    <div class="card__desc">{{ item.title }}</div>
    <div class="card__foot">
      <div class="card__price">{{ item.price }} ₽</div>
      <button @click="cartStore.addCartItem(item)" class="card__btn">+</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 278px;
  height: 376px;
  transition: all 0.2s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.card:hover .card__btn {
  display: block;
}

.card__img {
}

.card__desc {
  font-size: 16px;
  font-weight: 300;
  line-height: 17.92px;
  letter-spacing: 0.02em;
}

.card__foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.card__price {
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  color: #1f2020;
  height: 32px;
}

.card__btn {
  background: #7bb899;
  color: #1f2020;
  text-align: center;
  border: none;
  cursor: pointer;

  width: 80px;
  height: 32px;
  border-radius: 8px;

  font-size: 22px;
  display: none;
}
</style>
