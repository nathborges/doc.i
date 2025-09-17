<template>
  <label class="switch">
    <input type="checkbox" v-model="modelValueProxy" :disabled="disabled" />
    <span class="slider" :class="{ checked: modelValueProxy, disabled }"></span>
    <span v-if="label" class="switch-label">{{ label }}</span>
  </label>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})
</script>

<style scoped>
.switch {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
}
.switch input {
  display: none;
}
.slider {
  width: 44px;
  height: 24px;
  background: var(--bg-secondary, #e4e7ec);
  border-radius: 12px;
  position: relative;
  transition: background 0.2s;
  box-shadow: 0 1px 4px rgba(102, 126, 234, 0.08);
  display: inline-block;
}
.slider::before {
  content: '';
  position: absolute;
  left: 3px;
  top: 3px;
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.2s, background 0.2s;
  box-shadow: 0 1px 4px rgba(102, 126, 234, 0.12);
}
.slider.checked {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.slider.checked::before {
  transform: translateX(20px);
  background: #fff;
}
.slider.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.switch-label {
  font-size: 15px;
  color: var(--text-primary, #333);
  user-select: none;
}
</style>
