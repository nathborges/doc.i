<script setup lang="ts">
  // imported components
  import TotalEarning from './components/TotalEarning.vue';
  import TotalOrder from './components/TotalOrder.vue';
  import TotalIncome from './components/TotalIncome.vue';
  import CategoriesSection from './components/CategoriesSection.vue';
  import PopularStocks from './components/PopularStocks.vue';
</script>

<template>
  <v-row>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Earning -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <TotalEarning />
    </v-col>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Order -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <TotalOrder />
    </v-col>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Income -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <TotalIncome />
    </v-col>

    <!-- -------------------------------------------------------------------- -->
    <!-- Categories Section -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12">
      <CategoriesSection />
    </v-col>
  </v-row>
</template>
