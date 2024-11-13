import { ref, computed } from "vue";
import axios from "axios";

import { defineStore } from "pinia";

export const useCardStore = defineStore("cardStore", () => {
  const items = ref([]);
  const itemsCounter = computed(() => items.value.length);

  const fetchItems = async (filters) => {
    try {
      const params = {
        sortBy: filters.sortBy,
      };

      const { data } = await axios.get(
        "https://c9eb088298b67fcc.mokky.dev/items",
        {
          params,
        }
      );

      items.value = data;
    } catch (err) {
      console.log("Ошибкааа", err);
    }
  };
  return {
    items,
    fetchItems,
    itemsCounter,
  };
});
