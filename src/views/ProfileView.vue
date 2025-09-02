<template>
  <div class="home-container">
    <Menu />
    <div class="main-content">
      <HeaderBar class="header-fixed" />
      <div class="content-area">
        <ProfileComponent />
      </div>
    </div>
  </div>
</template>

<script setup>
import Menu from '@/components/Menu.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import ProfileComponent from './profilecomponente.vue'
</script>

<style scoped>
.home-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-secondary);
  overflow: hidden;
}

.main-content {
  flex: 10;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header-fixed {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
}

.content-area {
  flex: 1;
  overflow-y: auto;
}
</style>