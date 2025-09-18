<script setup lang="ts">
  import { ref, shallowRef } from 'vue';

  import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
  import UiParentCard from '@/components/shared/UiParentCard.vue';

  const page = ref({ title: 'Página de Exemplo' });
  const breadcrumbs = shallowRef([
    {
      title: 'Outros',
      disabled: false,
      href: '#',
    },
    {
      title: 'Página de Exemplo',
      disabled: true,
      href: '#',
    },
  ]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Título Simples">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut
        laborers et doolie magna alissa. Ut enif ad minim venice, quin nostrum exercitation illampu
        laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in reprehended in
        voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non
        president, sunk in culpa qui officiate descent molls anim id est labours.
      </UiParentCard>
    </v-col>
  </v-row>
</template>
