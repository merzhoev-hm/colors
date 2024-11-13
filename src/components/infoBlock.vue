<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String,
});
</script>

<template>
  <div class="info__wrapper">
    <img height="140" width="140" class="" :src="imageUrl" alt="info image" />
    <h2 class="info__title">{{ title }}</h2>
    <p class="text-gray-400">{{ description }}</p>
  </div>
</template>

<style scoped>
.info__wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  align-items: center;
  text-align: center;
  justify-content: center;

  max-width: 288px;
  height: 100%;
}

.info__title {
  margin-top: 16px;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
}
</style>
