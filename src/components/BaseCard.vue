<template>
  <div ref="cardRef" class="base-card" @click="handleClick">
    <div class="card-header">
      <div class="card-icon" :style="iconStyle">
        <span class="material-icons">{{ icon }}</span>
      </div>
      <button v-if="showMenu" class="menu-btn" @click.stop="toggleMenu">
        <span class="material-icons">more_vert</span>
      </button>
      <div v-if="showMenu && isMenuOpen" class="dropdown-menu" @click.stop>
        <slot name="menu-items"></slot>
      </div>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-subtitle">{{ subtitle }}</p>
      <div v-if="$slots.tags" class="card-tags">
        <slot name="tags"></slot>
      </div>
      <div v-if="footer" class="card-footer">{{ footer }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  title: String,
  subtitle: String,
  footer: String,
  icon: String,
  iconStyle: Object,
  showMenu: Boolean,
  clickable: { type: Boolean, default: true },
  menuId: String
})

const emit = defineEmits(['click', 'menu-toggle'])

const isMenuOpen = ref(false)
const cardRef = ref(null)

const handleClick = () => {
  if (props.clickable) {
    emit('click')
  }
}

const toggleMenu = () => {
  const newState = !isMenuOpen.value
  if (newState) {
    window.dispatchEvent(new CustomEvent('close-all-menus', { detail: { except: props.menuId } }))
  }
  isMenuOpen.value = newState
  emit('menu-toggle', newState)
}

const handleClickOutside = (event) => {
  if (cardRef.value && !cardRef.value.contains(event.target)) {
    isMenuOpen.value = false
    emit('menu-toggle', false)
  }
}

const handleCloseAllMenus = (event) => {
  if (event.detail.except !== props.menuId) {
    isMenuOpen.value = false
    emit('menu-toggle', false)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('close-all-menus', handleCloseAllMenus)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('close-all-menus', handleCloseAllMenus)
})
</script>

<style scoped>
.base-card {
  background-color: var(--bg-primary);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  min-width: 180px;
  flex-shrink: 0;
  position: relative;
}

.base-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.base-card:hover .card-icon::before {
  opacity: 1;
}

.card-icon .material-icons {
  font-size: 22px;
  transition: all 0.3s ease;
  z-index: 1;
}

.base-card:hover .card-icon .material-icons {
  transform: scale(1.1);
}

.menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--text-secondary);
  border-radius: 4px;
}

.menu-btn:hover {
  background: var(--bg-secondary);
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 16px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  z-index: 10;
  min-width: 140px;
  overflow: hidden;
  backdrop-filter: blur(8px);
}

.card-title {
  margin: 0 0 4px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-subtitle {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-tags {
  margin-bottom: 8px;
}

.card-footer {
  font-size: 12px;
  color: var(--text-placeholder);
  font-weight: 500;
}
</style>