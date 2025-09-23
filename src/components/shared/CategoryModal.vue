<script setup lang="ts">
  import { ref } from 'vue';
  import ModalWrapper from './ModalWrapper.vue';
  import { categoryIconMap } from '@/utils/fileIcons';
  import { useCategoriesStore } from '@/stores/categories';

  interface Props {
    modelValue: boolean;
  }

  interface Emits {
    (e: 'update:modelValue', value: boolean): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
  const categoriesStore = useCategoriesStore();

  const categoryName = ref('');
  const categoryDescription = ref('');
  const categoryColor = ref('#1976d2');
  const isLoading = ref(false);

  const selectedIcon = ref('FolderIcon');

  const availableIcons = [
    { name: 'FolderIcon', component: categoryIconMap.FolderIcon, title: 'Pasta' },
    { name: 'FileIcon', component: categoryIconMap.FileIcon, title: 'Arquivo' },
    { name: 'BookIcon', component: categoryIconMap.BookIcon, title: 'Livro' },
    { name: 'BriefcaseIcon', component: categoryIconMap.BriefcaseIcon, title: 'Trabalho' },
    { name: 'HeartIcon', component: categoryIconMap.HeartIcon, title: 'Favoritos' },
    { name: 'HomeIcon', component: categoryIconMap.HomeIcon, title: 'Casa' },
    { name: 'SettingsIcon', component: categoryIconMap.SettingsIcon, title: 'Configurações' },
  ];

  const availableColors = [
    '#0d47a1', '#2e7d32', '#e65100', '#b71c1c',
    '#4a148c', '#263238', '#ad1457',
    '#bf360c', '#3e2723', '#6a1b9a'
  ];

  const closeModal = () => {
    emit('update:modelValue', false);
    resetForm();
  };

  const createCategory = async () => {
    isLoading.value = true;
    try {
      await categoriesStore.createCategory({
        name: categoryName.value,
        description: categoryDescription.value,
        color: categoryColor.value,
        iconName: selectedIcon.value,
      });
      closeModal();
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const resetForm = () => {
    categoryName.value = '';
    categoryDescription.value = '';
    categoryColor.value = '#1976d2';
    selectedIcon.value = 'FolderIcon';
  };
</script>

<template>
  <ModalWrapper :is-open="props.modelValue" title="Nova Categoria" @close="closeModal">
    <v-text-field
      v-model="categoryName"
      label="Nome da categoria"
      variant="outlined"
      class="mb-4"
      :hide-details="true"
      :maxlength="200"
    />
    <v-textarea
      v-model="categoryDescription"
      label="Descrição"
      variant="outlined"
      rows="3"
      class="mb-4"
      :hide-details="true"
      :maxlength="50"
    />

    <v-select
      v-model="selectedIcon"
      :items="availableIcons"
      item-title="title"
      item-value="name"
      label="Ícone"
      variant="outlined"
      density="compact"
      :hide-details="true"
      class="mb-4"
    >
      <template v-slot:selection="{ item }">
        <div class="d-flex align-center ga-2">
          <component :is="item.raw.component" size="20" />
          <span style="font-size: 0.875rem">{{ item.raw.title }}</span>
        </div>
      </template>
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props">
          <template v-slot:prepend>
            <component :is="item.raw.component" size="20" class="mr-2" />
          </template>
        </v-list-item>
      </template>
    </v-select>

    <div class="color-selection">
      <div class="text-caption mb-2">Cor</div>
      <div class="d-flex flex-wrap ga-2 justify-center mb-2">
        <div
          v-for="color in availableColors"
          :key="color"
          class="color-square"
          :class="{ 'selected': categoryColor === color }"
          :style="{ backgroundColor: color }"
          @click="categoryColor = color"
        />
      </div>
    </div>

    <template #footer>
      <v-btn
        color="primary"
        class="pr-5 pl-5"
        variant="flat"
        size="large"
        rounded="sm"
        :loading="isLoading"
        :disabled="isLoading"
        @click="createCategory"
      >
        Criar categoria
      </v-btn>
    </template>
  </ModalWrapper>
</template>

<style scoped>
  :deep(.v-list-item-title) {
    font-size: 0.875rem !important;
    font-weight: normal !important;
  }

  .color-square {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s ease;
  }

  .color-square:hover {
    transform: scale(1.1);
  }

  .color-square.selected {
    border-color: rgba(0, 0, 0, 0.3);
    transform: scale(1.1);
  }

  .color-selection {
    min-width: 200px;
  }
</style>
