<template>
  <div class="container">
    <div class="auth-form">
      <div class="logo">
        <img src="@/assets/images/doci-logo.png" alt="Doci" class="logo-image" />
      </div>

      <div class="content-holder">
        <div class="login-container">
          <h1>{{ title }}</h1>
          <p>
            {{ description }}
          </p>
        </div>
        <slot name="form-content" />
      </div>
    </div>
    <div class="image-container">
      <div class="image">
        <Carousel />
      </div>
      <h1 class="caption animate-item" style="animation-delay: 0.2s">
        Use o Doc.i para transformar documentos soltos em insights de verdade.
        Organize, busque e exporte dados de forma simples e rápida.
      </h1>
    </div>
  </div>
</template>

<script setup>
import Carousel from './Carousel.vue'

defineProps({
  title: String,
  description: String
})
</script>

<style scoped>
.container {
  --spacing-5vh: 6vh;
  --spacing-5vw: 5vw;
  width: 100vw;
  margin: 0 auto;
  display: flex;
  height: 100vh;
  align-items: stretch;
  gap: 0;
  overflow: hidden;
}

.auth-form {
  flex: 0.4;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 30px 25px;
  gap: var(--spacing-5vh);
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-lg);
  z-index: 1;
}

.image-container {
  flex: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-secondary);
  padding: 30px 25px;
  position: relative;
  gap: 50px;
}

.caption {
  text-align: center;
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: var(--font-semibold);
  max-width: 80%;
  line-height: 1.4;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

.logo-image {
  max-height: 50px;
  width: auto;
}

.content-holder {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: var(--spacing-2vh);

}

.login-container {
  text-align: center;
  padding-left: 5vw;
  padding-right: 5vw;
}

.animate-item {
  animation: slideInUp 1.2s ease-out both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilos compartilhados */
:deep(.form-group) {
  margin-bottom: 13px;
}

:deep(form) {
  padding-left: 5vw;
  padding-right: 5vw;
}

:deep(.password-group) {
  position: relative;
}

:deep(.toggle-password) {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none !important;
  border: none;
  color: var(--secondary-color);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 5px;
  width: auto;
  margin: 0;
}

:deep(.toggle-password:hover) {
  background: none !important;
  color: var(--secondary-color-hover);
  transform: translateY(-50%) !important;
  box-shadow: none !important;
}

:deep(input) {
  border: 1px solid var(--border-color);
  padding-left: 30px;
  transition: all 0.3s ease;
}

:deep(.password) {
  padding-right: 45px !important;
}

:deep(input:focus) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

:deep(button) {
  color: var(--text-light);
  border: none;
  cursor: pointer;
  padding-top: 12px;
  padding-bottom: 12px;
  font-weight: var(--font-bold);
  transition: all 0.3s ease;
  width: 100%;
}

:deep(button:hover:not(:disabled)) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

:deep(button[type='submit']:hover) {
  background-color: var(--primary-color-hover);
}

:deep(.auth-link) {
  text-align: center;
  margin-top: 2vh;
}

:deep(.auth-link a) {
  font-size: 0.9rem;
}

:deep(.bold-link) {
  font-weight: var(--font-semibold);
  color: var(--primary-color);
  text-decoration: none;
}

:deep(.bold-link:hover) {
  text-decoration: underline;
}

:deep(.loading-content) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

:deep(.spinner) {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
