<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useDrawerStore } from '../../../stores/drawer';
  import { SettingsIcon, SearchIcon, Menu2Icon } from 'vue-tabler-icons';

  import ProfileDD from './ProfileDD.vue';
  import Searchbar from './SearchBarPanel.vue';
  import { useSearchStore } from '@/stores/search';

  const drawerStore = useDrawerStore();
  const searchStore = useSearchStore();

  const showSearch = ref(false);
  function searchbox() {
    searchStore.clearIsAnActiveSearch();
    showSearch.value = !showSearch.value;
  }

  const shouldShowProfile = computed(() => {
    if (drawerStore.iaDrawerIsOpen) {
      return false;
    }
    return true;
  });
</script>

<template>
  <v-app-bar elevation="0" height="80">
    <v-btn
      class="hidden-lg-and-up text-secondary ms-3"
      color="lightsecondary"
      icon
      rounded="sm"
      variant="flat"
      @click.stop="drawerStore.SET_SIDEBAR_DRAWER"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>

    <!-- search mobile -->
    <v-btn
      class="hidden-lg-and-up text-secondary ml-3"
      color="lightsecondary"
      icon
      rounded="sm"
      variant="flat"
      size="small"
      @click="searchbox"
    >
      <SearchIcon size="17" stroke-width="1.5" />
    </v-btn>

    <v-sheet v-if="showSearch" class="search-sheet v-col-12">
      <Searchbar :closesearch="searchbox" />
    </v-sheet>

    <!-- ---------------------------------------------- -->
    <!-- Search part -->
    <!-- ---------------------------------------------- -->
    <!-- Search part -->
    <v-sheet class="mx-3 d-none d-lg-block w-33">
      <Searchbar />
    </v-sheet>

    <!---/Search part -->

    <v-spacer />

    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->
    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn
          class="profileBtn text-primary"
          color="lightprimary"
          variant="flat"
          rounded="pill"
          v-bind="props"
        >
          <v-avatar size="30" class="mr-2 py-2">
            <img src="@/assets/images/profile/user-round.svg" alt="Julia" />
          </v-avatar>
          <SettingsIcon stroke-width="1.5" />
        </v-btn>
      </template>
      <v-sheet rounded="md" elevation="12">
        <ProfileDD v-if="shouldShowProfile" />
      </v-sheet>
    </v-menu>
  </v-app-bar>
</template>
