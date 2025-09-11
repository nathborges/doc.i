<script setup>
  import CategoriesSection from './CategoriesSection.vue'
  import RecentFilesSection from './RecentFilesSection.vue'
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
    height: 100%;
    flex: 10;
    overflow: hidden;
    padding: 40px;
  }
</style>
