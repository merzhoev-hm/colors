<script setup>
import Header from "./components/Header.vue";
import Slider from "./components/Slider.vue";
import ProductList from "./components/ProductList.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header />
  <main class="main">
    <Slider />
    <ProductList />
  </main>
  <Footer />
</template>

<style scoped></style>
