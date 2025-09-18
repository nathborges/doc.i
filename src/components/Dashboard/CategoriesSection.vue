<script setup lang="ts">
  import { ref, shallowRef, onMounted } from 'vue';
  import { TrashIcon, DotsIcon } from 'vue-tabler-icons';
  import { CategoriesService } from '@/services/categories.service';
  import iconCard from '@/assets/images/icons/icon-card.svg';

  const categories = ref([]);
  const loading = ref(true);

  const loadCategories = async () => {
    try {
      const data = await CategoriesService.getCategories();
      categories.value = data.map((cat: any) => ({
        id: cat.id,
        title: cat.name.charAt(0).toUpperCase() + cat.name.slice(1).toLowerCase(),
        subtitle: cat.description,
        value: '0',
        backgroundColor: cat.color,
        iconColor: cat.color,
        iconName: cat.iconName,
      }));
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    } finally {
      loading.value = false;
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      await CategoriesService.deleteCategory(categoryId);
      // Remove da lista local sem recarregar
      categories.value = categories.value.filter((cat: any) => cat.id !== categoryId);
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
    }
  };

  onMounted(() => {
    loadCategories();
  });

  const menuItems = shallowRef([{ title: 'Deletar', icon: TrashIcon, action: 'delete' }]);
</script>

<template>
  <v-card elevation="0">
    <v-card variant="outlined">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="9">
            <span class="text-subtitle-1 text-disabled font-weight-bold">Categorias</span>
          </v-col>
        </v-row>

        <v-row v-if="!loading" style="min-height: 200px">
          <v-col
            v-for="category in categories"
            :key="category.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
          >
            <v-card
              elevation="0"
              class="bg-containerBg overflow-hidden bubble-shape"
              :style="`--bubble-color: ${category.backgroundColor}; --icon-color: ${category.iconColor}`"
            >
              <v-card-text class="pa-4">
                <div class="d-flex align-start mb-4">
                  <v-btn icon rounded="sm" variant="flat" class="icon-btn">
                    <img :src="iconCard" width="25" />
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
                <h2 class="text-h3 font-weight-medium text-darkText">
                  {{ category.title }}
                </h2>
                <div class="text-subtitle-1 text-lightText">{{ category.subtitle }}</div>
                <div class="text-caption text-disabled mt-1">{{ category.value }} arquivos</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            v-if="categories.length === 0"
            cols="12"
            class="d-flex align-center justify-center"
            style="height: 160px"
          >
            <div class="text-body-1 font-weight-regular">Nenhuma categoria encontrada</div>
          </v-col>
        </v-row>

        <v-row v-if="loading" style="min-height: 200px">
          <v-col v-for="n in 5" :key="n" cols="12" sm="6" md="4" lg="3" xl="2">
            <v-card elevation="0" class="bg-containerBg" height="160">
              <v-card-text class="pa-4">
                <div class="d-flex align-start mb-4">
                  <v-skeleton-loader type="avatar" width="32" height="32" class="mr-3" />
                  <v-spacer />
                  <v-skeleton-loader type="button" width="20" height="20" />
                </div>
                <v-skeleton-loader type="heading" class="mb-2" height="32" />
                <v-skeleton-loader type="text" width="80%" class="mb-1" height="16" />
                <v-skeleton-loader type="text" width="60%" height="12" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<style scoped>
  .bubble-shape::before,
  .bubble-shape::after {
    background: var(--bubble-color) !important;
  }

  .icon-btn {
    background-color: var(--icon-color) !important;
  }

  :deep(.v-btn) {
    text-transform: none !important;
  }
</style>
