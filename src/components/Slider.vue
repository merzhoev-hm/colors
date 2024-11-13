<script setup>
import { ref } from "vue";
import Slide from "./Slide.vue";

const offset = ref(0);
const slides = ref([
  {
    id: 1,
    title: "Краски 1",
    desc: "Идеально подходят для стен и других поверхностей. Найди свой идеальный цвет!",
  },
  {
    id: 2,
    title: "Краски 2",
    desc: "Идеально подходят для стен и других поверхностей. Найди свой идеальный цвет!",
  },
  {
    id: 3,
    title: "Краски 3",
    desc: "Идеально подходят для стен и других поверхностей. Найди свой идеальный цвет!",
  },
]);
const slideIndex = ref(0);

const nextSlide = () => {
  if (slideIndex.value === slides.value.length - 1) {
    offset.value = 0;
    slideIndex.value = 0;
    return;
  }

  offset.value -= 572;

  slideIndex.value += 1;
};

const prevSlide = () => {
  if (slideIndex.value === 0) {
    offset.value = -(slides.value.length - 1) * 572;
    slideIndex.value = slides.value.length - 1;
    return;
  }

  offset.value += 572;
  slideIndex.value -= 1;
};
</script>

<template>
  <div class="container sliderbg__image">
    <div class="slider">
      <p>Главная - Продукты - Краски</p>
      <div class="slider__wrapper">
        <div @click="prevSlide" class="slider-btn slider__prev-btn">
          <img src="/VectorL.svg" alt=">" />
        </div>
        <div class="slider__wrapper-slides">
          <div
            class="inner__wrapper-slides"
            :style="{
              transform: `translateX(${offset}px)`,
              transition: `transform 0.3s ease-in-out`,
            }"
          >
            <Slide v-for="slide in slides" :key="slide.id" :slide="slide" />
          </div>
        </div>
        <div @click="nextSlide" class="slider-btn slider__next-btn">
          <img src="/VectorR.svg" alt=">" />
        </div>
      </div>
      <div class="slider__dots">
        <li
          v-for="(index, i) in slides.length"
          :key="i"
          :class="['slider__dot', { activedot: slideIndex === i }]"
        ></li>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sliderbg__image {
  height: 560px;

  background-image: url("/public/slider-img.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.slider {
  height: 560px;

  padding: 35px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.9 linear;
}

.slider > p {
  color: #c4c4c4;
  font-size: 10px;
  line-height: 10px;
  opacity: 30%;
  align-self: flex-start;
}

.slider__wrapper {
  color: #fff;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
}

.slider__wrapper-slides {
  width: 472px;
  text-align: center;
  overflow: hidden;
}
.inner__wrapper-slides {
  width: 400%;
  display: flex;
  gap: 100px;
}

.slider-btn {
  cursor: pointer;
}
.slider__next-btn {
  position: absolute;
  right: 0;
}
.slider__prev-btn {
  position: absolute;
  left: 0;
}

.slider__dots {
  padding: 13px 24px;

  background-color: #00000066;
  color: #fff;

  border-radius: 16px;
  display: flex;
  gap: 8px;
}

.slider__dot {
  background-color: #fff;
  opacity: 20%;

  width: 6px;
  height: 6px;

  border-radius: 50%;
}

.activedot {
  opacity: 100%;
}
</style>
