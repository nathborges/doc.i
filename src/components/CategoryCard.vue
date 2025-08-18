<template>
  <BaseCard
    :title="category.name"
    :subtitle="subtitle || 'Categoria'"
    :footer="`${category.fileCount || 0} arquivos`"
    :icon="category.icon || 'folder'"
    :icon-style="{
      backgroundColor: category.color?.background || category.color,
      color: category.color?.item || 'white'
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
  router.push({ name: 'category', params: { name: props.category.name } })
}

const handleEdit = () => {
  console.log('Editar categoria:', props.category.name)
}

const handleDelete = async () => {
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
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-primary);
}

.menu-item:hover {
  background: var(--bg-secondary);
}

.menu-item.delete {
  color: #d32f2f;
}

.menu-item .material-icons {
  font-size: 16px;
}
</style>