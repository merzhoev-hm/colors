<script setup>
import { ref } from "vue";
import { useCartStore } from "@/stores/CartProductStore";

const cartStore = useCartStore();

import Drawer from "./Drawer.vue";

const drawerOpen = ref(false);

const closeDrawer = () => {
  drawerOpen.value = false;
  document.body.style.paddingRight = "";
  document.body.classList.remove("overflow-hidden");
  cartStore.orderId = null;
};

const openDrawer = () => {
  drawerOpen.value = true;
  document.body.style.paddingRight =
    window.innerWidth - document.documentElement.clientWidth + "px";
  document.body.classList.add("overflow-hidden");
};
</script>

<template>
  <Drawer v-if="drawerOpen" @closeDrawer="closeDrawer" />
  <div class="container">
    <header class="header">
      <button class="header__burger-btn">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="header__left">
        <img class="header__logo" src="/logo.svg" alt="logo" />
        <ul class="header__nav">
          <li><a href="#">Продукты</a></li>
          <li><a href="#">Цвета</a></li>
          <li><a href="#">Вдохновение</a></li>
          <li><a href="#">Советы</a></li>
          <li><a href="#">Найти магазин</a></li>
        </ul>
      </div>
      <div class="header__right">
        <div class="header__phone">
          <p>+7 (495) 221-77-69</p>
          <a href="#">Заказать звонок</a>
        </div>
        <div class="header__actions">
          <img src="/search.svg" alt="search" />
          <img src="/profile.svg" alt="profile" />
          <img src="/heart.svg" alt="favorite" />
        </div>
      </div>
      <div
        class="cart__img"
        v-if="cartStore.cartCounter === 0"
        @click="openDrawer"
      >
        <img src="/cart_icon.svg" alt="cart" />
      </div>
      <div v-else @click="openDrawer" class="header__cart-btn">
        {{ cartStore.cartCounter }}
      </div>
    </header>
  </div>
</template>

<style scoped>
.header {
  padding: 40px 0;

  display: flex;
  align-items: center;
}

.header__right {
  display: flex;
  align-items: center;

  gap: 116px;
  margin-right: 24px;
}

.header__left {
  display: flex;
  align-items: center;

  gap: 172px;
  margin-right: auto;
}

.header__logo {
  cursor: pointer;
}

.header__nav {
  display: flex;
  gap: 24px;

  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
}

.header__phone {
}

.header__phone p {
  font-size: 16px;
  font-weight: 500;
}

.header__phone a {
  opacity: 30%;
}

.header__actions {
  display: flex;
  gap: 24px;
}

.header__actions img {
  cursor: pointer;
}

.cart__img {
  cursor: pointer;
}

.header__cart-btn {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #7bb899;

  font-weight: 500;
  font-size: 12px;
  line-height: 14.52px;

  height: 22px;
  width: 22px;
  border-radius: 50%;

  cursor: pointer;
}

.header__burger-btn {
  display: none;
  width: 40px;
  height: 40px;
  position: relative;
}

.header__burger-btn span {
  width: 30px;
  height: 3px;
  position: absolute;
  background: #000;
  left: 5px;
}

.header__burger-btn span:nth-child(1) {
  transform: translateY(-10px);
}
.header__burger-btn span:nth-child(3) {
  transform: translateY(10px);
}

@media screen and (max-width: 1380px) {
  .header__right {
    display: flex;
    align-items: center;

    gap: 40px;
    margin-right: 24px;
  }

  .header__left {
    display: flex;
    align-items: center;

    gap: 50px;
    margin-right: auto;
  }
}

@media screen and (max-width: 1160px) {
  .header__phone {
    display: none;
  }
}

@media screen and (max-width: 980px) {
  .header__nav,
  .header__right {
    display: none;
  }

  .header__left {
    margin-right: 0;
  }
  .header {
    justify-content: space-between;
  }

  .header__burger-btn {
    display: block;
  }
}
</style>
