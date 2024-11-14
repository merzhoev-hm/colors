<script setup>
import { useCartStore } from "@/stores/CartProductStore";

const cartStore = useCartStore();

defineProps({
  item: Object,
  index: Number,
});
</script>

<template>
  <div class="card">
    <div class="card__left">
      <img class="card__img" :src="item.imageUrl" alt="/" />
      <div class="card__desc">
        <p class="card__title">{{ item.title }}</p>
        <p class="card__price">{{ item.price * item.quantity }} ₽</p>
      </div>
    </div>
    <div class="card__right">
      <div class="card__quantity-btn">
        <button @click="cartStore.removeQty(index)">-</button>
        <span>{{ item.quantity }}</span>
        <button @click="cartStore.addQty(index)">+</button>
      </div>
      <button @click="cartStore.removeCartItem(item)" class="card__remove-btn">
        <img src="/x.svg" alt="X" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  min-height: 96px;
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px 0;
}

.card__left {
  display: flex;
  gap: 8px;
}

.card:hover .card__btn {
  display: block;
}

.card__img {
  height: 96px;
  width: 96px;
}

.card__desc {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 165px;
}

.card__title {
  font-size: 16px;
  font-weight: 300;
  line-height: 17.92px;
}

.card__right {
  display: flex;
  align-items: center;
  gap: 35px;
}

.card__price {
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
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

.card__remove-btn {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 20%;
}

.card__quantity-btn {
  display: flex;
  align-items: center;
  gap: 20px;
}

.card__quantity-btn button {
  width: 40px;
  height: 24px;
  border-radius: 4px;
  background: rgba(242, 242, 242, 1);
}

@media screen and (max-width: 550px) {
  .card {
    flex-direction: column;
    gap: 20px;
  }

  .card__right {
    align-self: flex-end;
  }

  /* .card__left {
    flex-direction: column;
  }

  .card__desc {
    gap: 10px;
  } */
}
</style>
