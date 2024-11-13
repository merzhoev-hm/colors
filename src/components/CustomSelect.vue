<script setup>
import { ref, watch } from "vue";

const model = defineModel();
const isOpen = ref(false);
const selectedOption = ref({
  value: "name",
  label: "По названию",
});

const options = [
  { value: "name", label: "По названию" },
  { value: "-price", label: "Сначала дорогие" },
  { value: "price", label: "Сначала недорогие" },
];
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  document.documentElement.style.scrollbarGutter = "stable";

  document.body.classList.add("overflow-hidden");
};

const selectOption = (option) => {
  if (option.value) {
    selectedOption.value = option;
  }
  isOpen.value = false;
  document.documentElement.style.scrollbarGutter = "auto";

  document.body.classList.remove("overflow-hidden");
};

watch(
  selectedOption,
  () => {
    model.value.sortBy = selectedOption.value.value;
  },
  { deep: true }
);
</script>

<template>
  <div v-if="isOpen" @click="selectOption" class="dropdown__bg"></div>
  <div class="sort-select">
    <div @click="toggleDropdown" class="selected-option">
      {{ selectedOption.label }}
      <span class="arrow">▼</span>
    </div>
    <div v-if="isOpen" class="dropdown">
      <div
        v-for="option in options"
        :key="option.value"
        :class="{ 'active-option': option.value === selectedOption.value }"
        @click="selectOption(option)"
        class="dropdown-option"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown__bg {
  position: fixed;
  background: #000000;
  opacity: 70%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
}

.sort-select {
  position: relative;
  min-width: 230px;
  font-family: Arial, sans-serif;
  text-transform: uppercase;

  font-size: 12px;
  font-weight: 500;
  line-height: 14.52px;
  letter-spacing: 0.06em;
}

.selected-option {
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow {
  margin-left: 10px;
}

.dropdown {
  width: 280px;
  position: absolute;
  top: -10px;
  left: -50px;
  right: 0;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-option {
  padding: 10px;
  cursor: pointer;

  padding: 17px 24px 17px;
}

.dropdown-option:hover {
  background-color: #e0f4f1;
}

.active-option {
  background-color: #7bb899;
}
</style>
