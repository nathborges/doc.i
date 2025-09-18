<script setup>
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { SearchIcon, BulbOffIcon, BulbIcon, XIcon } from 'vue-tabler-icons';
  import { useSearchStore } from '@/stores/search';
  import { useDrawerStore } from '@/stores/drawer';

  const props = defineProps({
    closesearch: { type: Function, required: false },
  });

  const route = useRoute();
  const searchStore = useSearchStore();
  const drawer = useDrawerStore();
  const usingIa = ref(true);
  const searchQuery = ref('');
  const isExpanded = ref(false);

  const categoryId = computed(() => route.params.id || null);
  const toggleIa = () => {
    usingIa.value = !usingIa.value;
  };

  const handleFocus = () => {
    isExpanded.value = true;
  };

  const handleBlur = () => {
    if (!searchQuery.value.trim()) {
      isExpanded.value = false;
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.value.trim() || searchStore.isLoading) return;

    try {
      await searchStore.performSearch(searchQuery.value, usingIa.value, categoryId.value);
      searchQuery.value = '';
      drawer.SET_IA_DRAWER(true);
      isExpanded.value = false;
    } catch (error) {
      console.error('Erro na busca:', error);
    }
  };
</script>

<template>
  <v-text-field
    v-model="searchQuery"
    persistent-placeholder
    placeholder="Busque arquivos, categorias ou insights da IA..."
    color="primary"
    variant="outlined"
    hide-details
    @keyup.enter="handleSearch"
    @focus="handleFocus"
    @blur="handleBlur"
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
        icon
        rounded="sm"
        variant="flat"
        size="small"
        class="text-error SearchSetting ml-3 d-block d-lg-none"
        @click="props.closesearch"
      >
        <XIcon stroke-width="1.5" size="20" />
      </v-btn>
    </template>
  </v-text-field>
</template>
