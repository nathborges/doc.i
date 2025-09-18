<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useDrawerStore } from '../../../stores/drawer';
  import sidebarItems from './sidebarItem';
  import { CategoriesService } from '@/services/categories.service';
  import { PlusIcon } from 'vue-tabler-icons';

  import NavGroup from './NavGroup/NavGroup.vue';
  import NavItem from './NavItem/NavItem.vue';
  import NavCollapse from './NavCollapse/NavCollapse.vue';
  import Logo from '../logo/LogoMain.vue';

  const drawer = useDrawerStore();
  const sidebarMenu = ref([]);
  const categories = ref([]);

  const loadCategories = async () => {
    try {
      const data = await CategoriesService.getCategories();
      categories.value = data.map((cat: any) => ({
        title: cat.name.charAt(0).toUpperCase() + cat.name.slice(1).toLowerCase(),
        icon: '',
        to: `/category/${cat.id}`,
      }));

      // Atualiza o menu com as categorias
      const updatedMenu = sidebarItems.map((item) => {
        if (item.title === 'Categorias') {
          return {
            ...item,
            children: categories.value,
          };
        }
        return item;
      });

      sidebarMenu.value = updatedMenu;
    } catch (error) {
      console.error('Erro ao carregar categorias no sidebar:', error);
      sidebarMenu.value = sidebarItems;
    }
  };

  onMounted(() => {
    loadCategories();
  });
</script>

<template>
  <v-navigation-drawer
    left
    v-model="drawer.Sidebar_drawer"
    elevation="0"
    mobile-breakpoint="lg"
    app
    class="leftSidebar"
  >
    <!---Logo part -->

    <div class="pa-5 d-flex align-center justify-center">
      <Logo size="big" />
    </div>

    <!-- Botão Importar -->
    <div class="px-6 pt-3 pa-2">
      <v-btn color="primary" variant="elevated" block rounded="sm" class="text-none">
        <PlusIcon size="16" stroke-width="1.5" class="mr-2" />
        Novo
      </v-btn>
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <v-list class="pa-4">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else class="leftPadding" />
          <!---End Single Item-->
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
