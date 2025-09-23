<script setup>
  import NavItem from '../NavItem/NavItem.vue';
  import Icon from '../IconSet.vue';

  const props = defineProps({ item: Object, level: Number });
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!---Fixed Header -->
  <!-- ---------------------------------------------- -->
  <v-list-item rounded class="mb-1 category-header" color="secondary" style="pointer-events: none;">
    <!---Icon  -->
    <template v-slot:prepend>
      <Icon :item="item.icon" :level="level" />
    </template>
    <!---Title  -->
    <v-list-item-title class="mr-auto">{{ item.title }}</v-list-item-title>
    <!---If Caption-->
    <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
      {{ item.subCaption }}
    </v-list-item-subtitle>
  </v-list-item>
  
  <!-- ---------------------------------------------- -->
  <!---Direct Children -->
  <!-- ---------------------------------------------- -->
  <template v-for="(subitem, i) in item.children" :key="i">
    <NavCollapse :item="subitem" v-if="subitem.children" :level="props.level + 1" />
    <NavItem :item="subitem" :level="props.level + 1" v-else></NavItem>
  </template>

  <!-- ---------------------------------------------- -->
  <!---End Item Sub Header -->
  <!-- ---------------------------------------------- -->
</template>
