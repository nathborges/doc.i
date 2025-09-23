<script setup lang="ts">
  import TotalAnalized from './components/TotalAnalized.vue';
  import TotalStorage from './components/TotalStorage.vue';
  import CategoriesSection from './components/CategoriesSection.vue';
</script>

<template>
  <v-row>
    <v-col cols="6">
      <TotalAnalized />
    </v-col>
    <v-col cols="6">
      <TotalStorage />
    </v-col>
    <!-- <v-col cols="12" md="4">
      <TotalIncome />
    </v-col> -->
    <v-col cols="12">
      <CategoriesSection />
    </v-col>
  </v-row>
</template>
