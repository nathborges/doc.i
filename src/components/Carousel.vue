<template>
  <swiper
    :modules="swiperModules"
    :slides-per-view="swiperOptions.slidesPerView"
    :space-between="swiperOptions.spaceBetween"
    :loop="swiperOptions.loop"
    :autoplay="swiperOptions.autoplay"
    :pagination="swiperOptions.pagination"
    :navigation="swiperOptions.navigation"
    class="my-swiper"
  >
    <swiper-slide v-for="(image, index) in images" :key="index">
      <img :src="image.src" :alt="image.alt" class="slide-image" />
    </swiper-slide>
  </swiper>
</template>

<script setup>
  import { ref } from 'vue'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Navigation, Pagination, Autoplay } from 'swiper/modules'

  import 'swiper/css'
  import 'swiper/css/navigation'
  import 'swiper/css/pagination'

  const swiperModules = [Navigation, Pagination, Autoplay]
  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      clickable: false
    },
    navigation: false
  }

  const images = ref([
    { src: './carousel/slide1.svg' },
    { src: './carousel/slide2.svg' },
    { src: './carousel/slide3.svg' }
  ])
</script>

<style scoped>
  .my-swiper {
    width: 60vw;
    height: 60vh;
  }

  .slide-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
</style>
