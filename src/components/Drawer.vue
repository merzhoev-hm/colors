<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/CartProductStore";
import CartProduct from "./CartProduct.vue";
import infoBlock from "./infoBlock.vue";

const cartStore = useCartStore();

const emit = defineEmits(["closeDrawer"]);

const buttonDisabled = computed(() =>
  cartStore.isCreatingOrder ? true : cartStore.cartTotal ? false : true
);
</script>

<template>
  <div class="drawer__bg"></div>
  <div
    class="drawer"
    :style="{ overflow: cartStore.cartTotal ? 'auto' : 'hidden' }"
  >
    <div class="drawer__top">
      <p>Корзина</p>
      <button @click="emit('closeDrawer')"><img src="/x.svg" alt="X" /></button>
    </div>
    <div class="cart__wrapper">
      <div v-if="!cartStore.cartTotal" class="cart__info">
        <infoBlock
          v-if="!cartStore.cartTotal && !cartStore.orderId"
          imageUrl="/package-icon.png"
          title="Корзина пустая"
          description="Добавьте хотя-бы один товар, что-бы сделать заказ"
        />
        <infoBlock
          v-if="cartStore.orderId"
          imageUrl="/order-success-icon.png"
          title="Заказ оформлен"
          :description="`Ваш заказ #${cartStore.orderId} оформлен скоро будет передан курьерской доставке`"
        />
      </div>
      <div v-if="cartStore.cartTotal" class="cart">
        <div class="cart__summary">
          <span class="items_count">{{ cartStore.cartCounter }} товара</span>
          <button @click="cartStore.clearCart" class="clear__list">
            очистить список
          </button>
        </div>
        <div class="cart__list">
          <CartProduct
            v-for="(item, index) in cartStore.cartItems"
            :key="item.id"
            :item="item"
            :index="index"
          />
        </div>
      </div>
      <div v-if="cartStore.cartTotal" class="drawer__foot">
        <div class="cart__price">
          <span>Итого</span>
          <p>
            {{ cartStore.cartTotal }}
          </p>
        </div>
        <button
          :disabled="buttonDisabled"
          @click="cartStore.createOrder"
          class="cart__btn"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.drawer__bg {
  position: fixed;
  background: #000;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  opacity: 70%;
}

.drawer {
  width: 600px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  background: #fff;
  z-index: 30;
  padding: 40px;
}

.cartInfo {
  display: flex;
  align-items: center;
  height: 100%;
  /* width: 300px; */
}

.drawer__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer__top > p {
  font-size: 30px;
  font-weight: 500;
  line-height: 26.4px;
  letter-spacing: -0.04em;
}

.drawer__top > button {
  width: 48px;
  height: 48px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart__wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: center;
}

.cart {
  margin-top: 80px;

  flex: 1;
}

.cart__list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cart__summary {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  padding-bottom: 10px;
}

.cart__info {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear__list {
  font-size: 14px;
  font-weight: 300;
  line-height: 15.68px;
  opacity: 50%;
}

.items_count {
  font-size: 14px;
  font-weight: 400;
  line-height: 15.68px;
}

.drawer__foot {
  display: flex;
  align-items: center;

  justify-content: space-between;
  margin-top: 30px;
}

.cart__price p {
  font-family: Inter;
  font-size: 30px;
  font-weight: 500;
  line-height: 30px;
}

.cart__btn {
  padding: 20px 57px;
  background: rgba(123, 184, 153, 1);
  border-radius: 4px;
}

.cart__btn:disabled {
  background: rgb(172, 173, 172);
}

@media screen and (max-width: 780px) {
  .drawer {
    width: 100%;
  }
}
</style>
