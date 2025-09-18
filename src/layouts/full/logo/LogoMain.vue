<script setup>
  const props = defineProps({
    size: {
      type: String,
      default: 'small',
      validator: (value) => ['very-small', 'small', 'big'].includes(value),
    },
  });

  const sizeClass = {
    'very-small': 'w-10',
    small: 'w-25',
    big: 'w-50',
  };
</script>
<template>
  <img src="../../../assets/images/logos/logo.png" alt="logo" :class="sizeClass[size]" />
</template>
