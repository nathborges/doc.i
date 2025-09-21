<script setup lang="ts">
  import { ref } from 'vue';
  import { FileImportIcon, TagIcon } from 'vue-tabler-icons';

  const emit = defineEmits<{
    openCategoryModal: [];
    openUploadModal: [];
    close: [];
  }>();

  const triggerFileUpload = () => {
    emit('openUploadModal');
    emit('close');
  };

  const openCategoryModal = () => {
    emit('openCategoryModal');
    emit('close');
  };
</script>

<template>
  <div class="pa-4">
    <v-list>
      <v-list-item color="secondary" rounded="md" @click="triggerFileUpload" class="cursor-pointer">
        <template v-slot:prepend>
          <FileImportIcon size="20" class="mr-2" />
        </template>
        <v-list-item-title class="text-subtitle-2">Upload de arquivo</v-list-item-title>
      </v-list-item>

      <v-list-item color="secondary" rounded="md" @click="openCategoryModal" class="cursor-pointer">
        <template v-slot:prepend>
          <TagIcon size="20" class="mr-2" />
        </template>
        <v-list-item-title class="text-subtitle-2">Nova categoria</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<style lang="scss" scoped>
  .v-list {
    padding: 0;
  }

  .cursor-pointer {
    cursor: pointer;
  }
</style>
