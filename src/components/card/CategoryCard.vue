<template>
  <BaseCard
    :title="category.name"
    :subtitle="category.description || 'Sem descrição'"
    :footer="`${category.fileCount} arquivos`"
    :icon="category.iconName"
    :icon-style="{
      backgroundColor: category.backgroundColor,
      color: category.color
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
  import BaseCard from '../card/BaseCard.vue'
  import { useRouter } from 'vue-router'
  import { useCategoriesStore } from '@/store/categories'

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

  const handleClick = () => {
    console.log(props)
    if (props.category?.name && props.category?.id) {
      router.push({
        name: 'category',
        params: {
          name: props.category.name.toLowerCase().replace(/\s+/g, '-'),
          id: props.category.id
        }
      })
    }
  }

  const handleEdit = () => {
    console.log('Editar categoria:', props.category.name)
  }

  const handleDelete = async () => {
    if (!props.category?.id) return

    if (
      !confirm(
        `Tem certeza que deseja excluir a categoria "${props.category.name}"?`
      )
    )
      return

    try {
      await categoriesStore.deleteCategory(props.category.id)
      await categoriesStore.fetchCategories()
      window.showToast('Categoria excluída com sucesso!', 'success')
    } catch (error) {
      window.showToast('Erro ao excluir categoria', 'error')
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
