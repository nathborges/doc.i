<template>
  <ModalWrapper
    v-if="isOpen"
    width="480px"
    title="Nova Categoria"
    @close="closeModal"
  >
    <div class="modal-body">
      <div class="icon-preview-section">
        <div
          class="icon-preview-icon"
          :style="{
            backgroundColor: selectedColor.background,
            color: selectedColor.item
          }"
        >
          <span class="material-icons">{{ selectedIcon }}</span>
        </div>
        <span class="icon-preview-text">{{
          categoryName || 'Nome da Categoria'
        }}</span>
      </div>

      <div class="form-group">
        <label>Nome da Categoria</label>
        <input
          v-model="categoryName"
          type="text"
          placeholder=""
          class="form-input"
          maxlength="30"
        />
      </div>

      <div class="form-group">
        <label>Descrição <span class="optional">(opcional)</span></label>
        <input
          v-model="description"
          type="text"
          placeholder=""
          class="form-input"
          maxlength="100"
        />
      </div>

      <div class="form-group-last">
        <label>Aparência</label>
        <div class="icon-appearance">
                    <div class="icon-selection">
            <div class="icon-grid">
              <div
                v-for="icon in icons"
                :key="icon"
                class="icon-option"
                :class="{ active: selectedIcon === icon }"
                :style="
                  selectedIcon === icon
                    ? { backgroundColor: selectedColor.item, color: 'white' }
                    : {}
                "
                @click="selectedIcon = icon"
              >
                <span class="material-icons">{{ icon }}</span>
              </div>
            </div>
          </div>
          <div class="icon-selection">
            <div class="color-grid">
              <div
                v-for="(color, index) in colors"
                :key="index"
                class="color-option"
                :class="{ active: selectedColor.item === color.item }"
                :style="{ backgroundColor: color.item }"
                @click="selectedColor = color"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <button
        class="modal-btn"
        :disabled="isLoading"
        :class="{ loading: isLoading }"
        @click="createCategory"
      >
        <span v-if="!isLoading">Criar Categoria</span>
        <span v-if="isLoading" class="loading-content">
          <span class="spinner"></span>
          Criando...
        </span>
      </button>
    </template>
  </ModalWrapper>
</template>

<script setup>
  import { ref } from 'vue'
  import ModalWrapper from './ModalWrapper.vue'
  import { FileService } from '@/services/files.service'
  import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/constants'

  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['close', 'created', 'error'])

  const categoryName = ref('')
  const description = ref('')
  const selectedColor = ref(CATEGORY_COLORS[0])
  const selectedIcon = ref(CATEGORY_ICONS[0])
  const isLoading = ref(false)

  const colors = CATEGORY_COLORS
  const icons = CATEGORY_ICONS

  const closeModal = () => {
    categoryName.value = ''
    description.value = ''
    selectedColor.value = CATEGORY_COLORS[0]
    selectedIcon.value = CATEGORY_ICONS[0]

    emit('close')
  }

  const createCategory = async () => {
    if (!categoryName.value.trim()) {
      window.showToast('Digite o nome da categoria', 'warning')
      return
    }
    if (!selectedColor.value.item || !selectedIcon.value) {
      window.showToast('Selecione cor e ícone', 'warning')
      return
    }

    isLoading.value = true
    try {
      await FileService.createCategory(
        categoryName.value.toLowerCase(),
        description.value,
        selectedIcon.value,
        selectedColor.value.item
      )
      window.showToast('Categoria criada com sucesso!', 'success')
      emit('created')
      closeModal()
    } catch (error) {
      console.error('Error creating category:', error)
      window.showToast('Erro ao criar categoria', 'error')
    } finally {
      isLoading.value = false
    }
  }
</script>

<style scoped>
  .form-group-last {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }



  .optional {
    color: var(--text-secondary);
  }

  .form-input {
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 14px;
  }

  .form-input:first-of-type::first-letter {
    text-transform: uppercase;
  }

  .icon-appearance {
    display: flex;
    flex-direction: column;
    gap: 2vh;
    padding: 16px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .icon-preview-section {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

  .icon-preview-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
  }

  .icon-preview-text {
    font-weight: 500;
    color: var(--text-primary);
  }

  .icon-selection h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 400;
    color: var(--text-placeholder);
  }

  .color-grid {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .color-option {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s;
  }

  .color-option:hover {
    transform: scale(1.1);
    border: 1px solid var(--border-color);
  }

  .color-option.active {
    box-shadow: 2px;
    transform: scale(1.1);
  }

  .icon-grid {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .icon-option {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    transition: all 0.2s;
    color: var(--text-secondary);
  }

  .icon-option:hover {
    transform: scale(1.1);
    border: 1px solid var(--border-color);
  }

  .icon-option.active {
    transform: scale(1.1);
    border-color: var(--primary-color);
  }


</style>
