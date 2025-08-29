<template>
  <BaseCard
    :title="category.name"
    :subtitle="category.description || 'Sem descrição'"
    :footer="`${category.fileCount} arquivos`"
    :icon="category.iconName"
    :icon-style="{
      backgroundColor: category.backgroundColor,
      color: category.iconColor
    }"
    :show-menu="true"
    :menu-id="`category-${category.id}`"
    @click="handleClick"
  >
    <template #menu-items>
      <button @click="handleEdit" class="menu-item">
        <span class="material-icons">edit</span>
        Editar
      </button>
      <button @click="handleDelete" class="menu-item delete">
        <span class="material-icons">delete</span>
        Excluir
      </button>
    </template>
  </BaseCard>
</template>

<script setup>
import BaseCard from './BaseCard.vue'
import { useRouter } from 'vue-router'
import { useCategoriesStore } from '@/store/CategoriesStore'
import { useGlobalState } from '@/composables/useGlobalState'

const props = defineProps({
  category: {
    type: Object,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const categoriesStore = useCategoriesStore()
const { addNotification } = useGlobalState()

const handleClick = () => {
  if (props.category?.name) {
    router.push({ name: 'category', params: { name: props.category.name } })
  }
}

const handleEdit = () => {
  console.log('Editar categoria:', props.category.name)
}

const handleDelete = async () => {
  if (!props.category?.id) return
  
  if (confirm('Tem certeza que deseja excluir esta categoria?')) {
    try {
      await categoriesStore.deleteCategory(props.category.id)
      addNotification({
        type: 'success',
        message: 'Categoria excluída com sucesso!'
      })
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Erro ao excluir categoria. Tente novamente.'
      })
    }
  }
}
</script>

<style scoped>
.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: var(--bg-secondary);
  color: var(--primary-color);
}

.menu-item.delete {
  color: var(--error-color);
}

.menu-item.delete:hover {
  background: rgba(231, 76, 60, 0.1);
  color: var(--error-color);
}

.menu-item .material-icons {
  font-size: 18px;
  opacity: 0.8;
}

.menu-item:hover .material-icons {
  opacity: 1;
}
</style>