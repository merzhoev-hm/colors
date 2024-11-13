import { ref, computed } from "vue";
import axios from "axios";

import { defineStore } from "pinia";

export const useCartStore = defineStore("cartStore", () => {
  const cartItems = ref([]);
  const orderId = ref(null);
  const isCreatingOrder = ref(false);
  const cartCounter = computed(() => {
    let total = 0;
    cartItems.value.map((item) => {
      total += item?.quantity;
    });
    return total;
  });

  const cartTotal = computed(() => {
    let sum = 0;
    cartItems.value.map((item) => {
      sum += sum + item.quantity * item.price;
    });
    return sum;
  });

  const fetchCartItems = async () => {
    try {
      const { data } = await axios.get(
        "https://c9eb088298b67fcc.mokky.dev/cart"
      );

      cartItems.value = data;
    } catch (err) {
      console.log("Ошибкааа", err);
    }
  };

  const addCartItem = async (item) => {
    try {
      if (cartItems.value.find((el) => el.id === item.id)) {
        let index;

        cartItems.value.map((el) => {
          if (el.id === item.id) {
            item = { ...el };
            index = cartItems.value.indexOf(el);
          }
        });

        cartItems.value[index].quantity++;
      } else {
        item.quantity = 1;
        cartItems.value.push(item);
      }

      const { data } = await axios.patch(
        "https://c9eb088298b67fcc.mokky.dev/cart",
        cartItems.value
      );
    } catch (err) {
      console.log("Ошибка при добавлении проудкта в корзину", err);
    }
  };

  const removeCartItem = async (item) => {
    try {
      let index;

      cartItems.value.map((el) => {
        if (el.id === item.id) {
          item = { ...el };
          index = cartItems.value.indexOf(el);
        }
      });
      cartItems.value.splice(index, 1);

      const { data } = await axios.delete(
        `https://c9eb088298b67fcc.mokky.dev/cart/${item.id}`
      );
      console.log(data);
    } catch (err) {
      console.log("Ошибка при удалении проудкта из корзины", err);
    }
  };

  const addQty = async (index) => {
    if (cartItems.value[index].quantity !== 100) {
      cartItems.value[index].quantity++;
      const response = await axios.patch(
        "https://c9eb088298b67fcc.mokky.dev/cart",
        cartItems.value
      );
    }
  };

  const removeQty = async (index) => {
    if (cartItems.value[index].quantity !== 1) {
      cartItems.value[index].quantity--;
      const response = await axios.patch(
        "https://c9eb088298b67fcc.mokky.dev/cart",
        cartItems.value
      );
    }
  };

  const clearCart = async () => {
    try {
      if (cartItems.value.length > 0) {
        cartItems.value = [];
        const response = await axios.patch(
          "https://c9eb088298b67fcc.mokky.dev/cart",
          cartItems.value
        );
      }
    } catch (error) {
      console.error("Ошибка при очистке корзины", error);
    }
  };

  const createOrder = async () => {
    try {
      isCreatingOrder.value = true;
      const { data } = await axios.post(
        "https://c9eb088298b67fcc.mokky.dev/orders",
        {
          items: cartItems.value,
          totalPrice: cartTotal.value,
        }
      );
      orderId.value = data.id;

      cartItems.value = [];
      const response = await axios.patch(
        "https://c9eb088298b67fcc.mokky.dev/cart",
        cartItems.value
      );
    } catch (error) {
      console.log(error);
    } finally {
      isCreatingOrder.value = false;
    }
  };

  return {
    cartItems,
    cartCounter,
    addCartItem,
    fetchCartItems,
    removeCartItem,
    clearCart,
    removeQty,
    addQty,
    cartTotal,
    createOrder,
    isCreatingOrder,
    orderId,
  };
});
