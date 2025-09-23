<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useDrawerStore } from '../../../stores/drawer';
  import sidebarItems from './sidebarItem';
  import { PlusIcon } from 'vue-tabler-icons';
  import NavGroup from './NavGroup/NavGroup.vue';
  import NavItem from './NavItem/NavItem.vue';
  import NavCollapse from './NavCollapse/NavCollapse.vue';
  import Logo from '../logo/LogoMain.vue';
  import NewDD from './NewDD.vue';
  import CategoryModal from '@/components/shared/CategoryModal.vue';
  import UploadModal from '@/components/shared/UploadModal.vue';
  import { useRouter } from 'vue-router';
  import { useDocumentsStore } from '@/stores/documents';
  import { useCategoriesStore } from '@/stores/categories';
  import LoadingOverlay from '@/components/shared/LoadingOverlay.vue';

  const drawer = useDrawerStore();
  const categoryModal = ref(false);
  const uploadModal = ref(false);
  const router = useRouter();
  const documentsStore = useDocumentsStore();
  const categoriesStore = useCategoriesStore();
  const menuOpen = ref(false);

  const sidebarMenu = computed(() => {
    const categories = categoriesStore.categories.map((cat: any) => ({
      title: cat.title,
      icon: '',
      to: `/category/${cat.id}`,
    }));

    return sidebarItems.map((item) => {
      if (item.title === 'Categorias') {
        return { ...item, children: categories };
      }
      return item;
    });
  });

  const openCategoryModal = () => {
    categoryModal.value = true;
  };

  const openUploadModal = () => {
    uploadModal.value = true;
  };

  const closeMenu = () => {
    menuOpen.value = false;
  };

  const handleCreateCategory = async () => {
    await categoriesStore.loadCategories();
    router.push('/');
  };

  const uploadEachFile = async (file: File, categoryId: string) => {
    try {
      await documentsStore.uploadDocuments(file, categoryId);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleUpload = async (data: { files: File[]; categoryId: string }) => {
    try {
      await documentsStore.uploadDocuments(data.files, data.categoryId);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  onMounted(async () => {
    // Só carrega categorias se não existirem
    if (categoriesStore.categories.length === 0) {
      await categoriesStore.loadCategories();
      console.log('Categories loaded:', categoriesStore.categories);
    }
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
    <div class="pa-5 d-flex align-center justify-center">
      <Logo size="big" />
    </div>

    <div class="px-6 pt-3 pb-3">
      <v-menu v-model="menuOpen" :close-on-content-click="false" location="end">
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            variant="elevated"
            block
            rounded="sm"
            class="text-none"
            v-bind="props"
          >
            <PlusIcon size="16" stroke-width="1.5" class="mr-2" />
            Novo
          </v-btn>
        </template>

        <v-sheet rounded="md" elevation="12" class="ml-2">
          <NewDD
            @close="closeMenu"
            @open-category-modal="openCategoryModal"
            @open-upload-modal="openUploadModal"
          />
        </v-sheet>
      </v-menu>
    </div>

    <perfect-scrollbar class="scrollnavbar">
      <v-list class="pa-4 pt-0">
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <v-divider class="my-3" v-else-if="item.divider" />
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <NavItem :item="item" v-else class="leftPadding" />
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>

  <CategoryModal v-model="categoryModal" @create="handleCreateCategory" />
  <UploadModal v-model="uploadModal" @upload="handleUpload" />
</template>
