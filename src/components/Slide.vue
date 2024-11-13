<script setup>
defineProps({
  slide: Object,
});
</script>

<template>
  <div class="wrapper-slide">
    <h3 class="slide__title">{{ slide.title }}</h3>
    <p class="slide__desc">
      {{ slide.desc }}
    </p>
  </div>
</template>

<style scoped>
.wrapper-slide {
  width: 472px;
}

.slide__title {
  font-size: 72px;
  font-weight: 400;
  line-height: 63.36px;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
}

.slide__desc {
  font-size: 16px;
  font-weight: 400;
  line-height: 20.8px;
  letter-spacing: 0.02em;
}
</style>
