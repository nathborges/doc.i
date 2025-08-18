<script setup>
import CategoriesSection from './section/CategoriesSection.vue'
import RecentFilesSection from './section/RecentFilesSection.vue'
</script>

<template>
  <div class="content">
    <RecentFilesSection />
    <CategoriesSection />
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>