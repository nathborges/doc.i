<script setup lang="ts">
  import { shallowRef, onMounted } from 'vue';
  import { TrashIcon, DotsIcon, FolderIcon } from 'vue-tabler-icons';
  import { useCategoriesStore } from '@/stores/categories';
  import { categoryIconMap } from '@/utils/fileIcons';
  import { useRouter } from 'vue-router';

  const categoriesStore = useCategoriesStore();
  const router = useRouter();

  const deleteCategory = async (categoryId: string) => {
    await categoriesStore.deleteCategory(categoryId);
  };

  const navigateToCategory = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  const getIcon = (iconName: string) => {
    return categoryIconMap[iconName as keyof typeof categoryIconMap] || FolderIcon;
  };

  onMounted(() => {
    categoriesStore.loadCategories();
  });

  const menuItems = shallowRef([{ title: 'Deletar', icon: TrashIcon, action: 'delete' }]);
</script>

<template>
  <v-card elevation="0">
    <v-card variant="outlined">
      <v-card-text class="d-flex ga-2 flex-column">
        <v-row>
          <v-col cols="12" sm="9">
            <span class="text-subtitle-1 text-disabled font-weight-bold">Categorias</span>
          </v-col>
        </v-row>

        <div v-if="!categoriesStore.loading" class="categories-scroll-container">
          <div class="categories-horizontal">
            <v-card
              v-for="category in categoriesStore.categories"
              :key="category.id"
              elevation="0"
              class="overflow-hidden bubble-shape category-card cursor-pointer"
              :style="`backgroundColor: ${category.backgroundColor}; --bubble-color: ${category.iconColor}; --icon-color: ${category.iconColor}`"
              @click="navigateToCategory(category.id)"
            >
              <v-card-text class="pa-4">
                <div class="d-flex align-start mb-4">
                  <v-btn icon rounded="sm" variant="flat" class="icon-btn">
                    <component :is="getIcon(category.iconName)" size="20" color="white" />
                  </v-btn>
                  <div class="ml-auto z-1">
                    <v-menu :close-on-content-click="false">
                      <template v-slot:activator="{ props }">
                        <v-btn icon rounded="sm" variant="text" size="small" v-bind="props">
                          <DotsIcon stroke-width="3" width="20" />
                        </v-btn>
                      </template>
                      <v-sheet rounded="md" width="150" class="elevation-10">
                        <v-list density="compact">
                          <v-list-item
                            v-for="(item, itemIndex) in menuItems"
                            :key="itemIndex"
                            :value="itemIndex"
                            :loading="categoriesStore.deletingCategory"
                            :disabled="categoriesStore.deletingCategory"
                            @click="item.action === 'delete' ? deleteCategory(category.id) : null"
                          >
                            <template v-slot:prepend>
                              <component :is="item.icon" stroke-width="1.5" size="20" />
                            </template>
                            <v-list-item-title class="ml-2">{{ item.title }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-sheet>
                    </v-menu>
                  </div>
                </div>
                <h2 class="text-h4 font-weight-medium text-white text-capitalize d-none d-sm-block">
                  {{ category.title }}
                </h2>
                <h2 class="text-h5 font-weight-bold text-white text-capitalize d-block d-sm-none">
                  {{ category.title }}
                </h2>

                <v-tooltip :text="category.subtitle" location="top">
                  <template v-slot:activator="{ props }">
                    <div v-bind="props" class="text-subtitle-1 text-white description-truncate">
                      {{ category.subtitle }}
                    </div>
                  </template>
                </v-tooltip>
                <div class="text-caption text-disabled mt-1 text-white">
                  {{ category.totalDocuments }} arquivos
                </div>
              </v-card-text>
            </v-card>
          </div>
          <div
            v-if="categoriesStore.categories.length === 0"
            class="d-flex align-center justify-center"
            style="height: 160px"
          >
            <div class="text-body-1 font-weight-regular">Nenhuma categoria encontrada</div>
          </div>
        </div>

        <div v-if="categoriesStore.loading" class="categories-scroll-container">
          <div class="categories-horizontal">
            <v-card
              v-for="n in 5"
              :key="n"
              elevation="0"
              class="bg-containerBg category-card"
              height="160"
            >
              <v-card-text class="pa-4">
                <div class="d-flex align-start mb-2">
                  <v-skeleton-loader type="avatar" width="32" height="32" class="mr-3" />
                  <v-spacer />
                  <v-skeleton-loader type="button" width="20" height="20" />
                </div>
                <v-skeleton-loader type="heading" class="mb-2" height="32" />
                <v-skeleton-loader type="text" width="80%" class="mb-1" height="16" />
                <v-skeleton-loader type="text" width="60%" height="12" />
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<style scoped>
  .bubble-shape::before,
  .bubble-shape::after {
    background: var(--bubble-color) !important;
    z-index: 0;
  }

  .icon-btn {
    background-color: var(--icon-color) !important;
  }

  :deep(.v-btn) {
    text-transform: none !important;
  }

  .categories-scroll-container {
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .bubble-shape .v-card-text {
    position: relative;
    z-index: 1;
  }

  .categories-horizontal {
    display: flex;
    gap: 16px;
  }

  .description-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .category-card {
    min-width: 200px;
    max-width: 200px;
    flex-shrink: 1;
    height: 160px;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .cursor-pointer:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
</style>