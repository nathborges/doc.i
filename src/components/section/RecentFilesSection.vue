<template>
  <SectionWrapper title="Arquivos Recentes" button-text="Ver todos" button-variant="text" @button-click="handleViewAll">
    <FileTable 
      :files="recentFiles" 
      :show-category="true"
      :show-status="false"
      :show-actions="false"
    />
  </SectionWrapper>
</template>

<script setup>
import SectionWrapper from './SectionWrapper.vue'
import FileTable from '../FileTable.vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useCategoriesStore } from '@/store/CategoriesStore'

const router = useRouter()
const categoriesStore = useCategoriesStore()

const handleViewAll = () => {
  router.push({ name: 'files' })
}



const recentFiles = computed(() => [
  {
    id: 1,
    fileName: 'Contrato_Fornecedor_2024.pdf',
    category: categoriesStore.categories.value[0]?.name || 'Sem categoria',
    categoryColor: categoriesStore.categories.value[0]?.iconColor || '#808080',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    fileSize: 2516582,
  },
  {
    id: 2,
    fileName: 'Relatorio_Vendas_Q1.xlsx',
    category: categoriesStore.categories.value[1]?.name || 'Sem categoria',
    categoryColor: categoriesStore.categories.value[1]?.iconColor || '#808080',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    fileSize: 1887436,
  }
])
</script>

