<template>
  <SectionWrapper 
    title="Arquivos Recentes"
    button-text="Ver todos"
    button-variant="text"
    @button-click="handleViewAll"
  >
    <div class="files-table">
      <div class="table-header">
        <div class="col-name">Nome</div>
        <div class="col-category">Categoria</div>
        <div class="col-modified">Modificado</div>
        <div class="col-size">Tamanho</div>
      </div>
      <div class="table-row" v-for="file in recentFiles" :key="file.id">
        <div class="col-name">
          <span class="material-icons file-type-icon" :class="file.type">{{ file.icon }}</span>
          {{ file.name }}
        </div>
        <div class="col-category">
          <span class="category-tag" :style="{ 
            backgroundColor: file.categoryColor?.item || file.categoryColor,
            color: 'white'
          }">
            {{ file.category }}
          </span>
        </div>
        <div class="col-modified">{{ file.modified }}</div>
        <div class="col-size">{{ file.size }}</div>
      </div>
    </div>
  </SectionWrapper>
</template>

<script setup>
import SectionWrapper from './SectionWrapper.vue'
import { useRouter } from 'vue-router'
import { CATEGORY_COLORS } from '@/constants'

const router = useRouter()

const handleViewAll = () => {
  router.push({ name: 'files' })
}

const generateRandomColor = () => CATEGORY_COLORS[Math.floor(Math.random() * CATEGORY_COLORS.length)]

const recentFiles = [
  {
    id: 1,
    name: 'Contrato_Fornecedor_2024.pdf',
    category: 'Contratos',
    categoryColor: generateRandomColor(),
    modified: '2 horas atrás',
    size: '2.4 MB',
    icon: 'picture_as_pdf',
    type: 'pdf',
  },
  {
    id: 2,
    name: 'Relatorio_Vendas_Q1.xlsx',
    category: 'Relatórios',
    categoryColor: generateRandomColor(),
    modified: '1 dia atrás',
    size: '1.8 MB',
    icon: 'grid_on',
    type: 'excel',
  }
]
</script>

<style scoped>
.files-table {
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  background: var(--bg-secondary);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  border-top: 1px solid var(--border-color);
  align-items: center;
  transition: background-color 0.2s;
  font-size: 14px;
}

.table-row:hover {
  background: var(--bg-secondary);
}

.col-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: var(--text-primary);
}

.col-category,
.col-modified,
.col-size {
  color: var(--text-secondary);
  font-size: 13px;
}

.file-type-icon {
  font-size: 18px;
}

.file-type-icon.pdf {
  color: #ef4444;
}

.file-type-icon.excel {
  color: #10b981;
}

.category-tag {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
}
</style>