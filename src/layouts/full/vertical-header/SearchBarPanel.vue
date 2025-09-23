<script setup>
  import { ref, computed, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { SearchIcon, XIcon } from 'vue-tabler-icons';
  import { useSearchStore } from '@/stores/search';
  import { useDrawerStore } from '@/stores/drawer';

  const props = defineProps({
    closesearch: { type: Function, required: false },
  });

  const route = useRoute();
  const searchStore = useSearchStore();
  const drawer = useDrawerStore();
  const searchQuery = ref('');

  const categoryId = computed(() => route.params.id || null);

  // watch(
  //   () => searchQuery.value,
  //   (newSearchQuery) => {
  //     if (newSearchQuery === '') {
  //       searchStore.clearIsAnActiveSearch();
  //     }
  //   }
  // );

  const cleanSearch = () => {
    searchQuery.value = '';
    searchStore.clearIsAnActiveSearch();
    props.closesearch();
  };  

  const handleSearch = async () => {
    if (!searchQuery.value.trim() || searchStore.isLoading) return;

    try {
      await searchStore.performSearch(searchQuery.value, categoryId.value);
      drawer.SET_IA_DRAWER(true);
    } catch (error) {
      console.error('Erro na busca:', error);
    }
  };
</script>

<template>
  <v-text-field
    v-model="searchQuery"
    persistent-placeholder
    placeholder="Busque arquivos ou insights da IA..."
    color="primary"
    variant="outlined"
    style="text-transform: capitalize;"
    hide-details
    @keyup.enter="handleSearch"
  >
    <template v-slot:append-inner>
      <v-btn
        :color="searchStore.isLoading ? 'primary' : 'lightsecondary'"
        icon
        rounded="sm"
        variant="flat"
        size="small"
        @click="handleSearch"
        :disabled="searchStore.isLoading"
      >
        <v-progress-circular
          v-if="searchStore.isLoading"
          indeterminate
          size="16"
          width="2"
          color="white"
        />
        <SearchIcon v-else stroke-width="1.5" size="18" />
      </v-btn>
      <v-btn
        color="lighterror"
        v-if="searchStore.isAnActiveSearch"
        icon
        rounded="sm"
        variant="flat"
        size="small"
        class="text-error SearchSetting ml-3 d-block"
        @click="cleanSearch"
      >
        <XIcon stroke-width="1.5" size="20" />
      </v-btn>
    </template>
  </v-text-field>
</template>
