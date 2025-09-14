<template>
  <div class="files-table">
    <div class="table-header">
      <div class="col-name">Nome</div>
      <div class="col-category" v-if="showCategory">Categoria</div>
      <div class="col-status" v-if="showStatus">Status</div>
      <div class="col-modified">Criado</div>
      <div class="col-size">Tamanho</div>
      <div class="col-actions" v-if="showActions">Ações</div>
    </div>
    <div class="table-body">
      <div class="table-row" v-for="file in files" :key="file.id">
        <div class="col-name">
          <span class="material-icons file-type-icon">{{
            getFileIcon(file.fileName || file.name)
          }}</span>
          {{ file.fileName || file.name }}
        </div>
        <div class="col-category" v-if="showCategory">
          <span
            class="category-tag"
            :style="{
              backgroundColor: file.categoryColor,
              color: 'white'
            }"
          >
            {{ file.categoryName }}
          </span>
        </div>
        <div class="col-status" v-if="showStatus">
          <span v-if="file.status === 'error'" class="status-tag error"
            >Erro ao enviar</span
          >
          <span v-else class="status-tag processed">Processado</span>
        </div>
        <div class="col-modified">
          {{ formatDate(file.createdAt || file.modified) }}
        </div>
        <div class="col-size">
          {{ file.fileSize }}
        </div>
        <div class="col-actions" v-if="showActions">
          <button @click="$emit('open-file', file)" class="action-btn">
            <span class="material-icons">download</span>
          </button>
          <button
            @click="$emit('delete-file', file.id)"
            class="action-btn delete"
          >
            <span class="material-icons">delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useFileIcons } from '@/composables/useFileIcons'

  defineProps({
    files: {
      type: Array,
      default: () => []
    },
    showCategory: {
      type: Boolean,
      default: false
    },
    showStatus: {
      type: Boolean,
      default: true
    },
    showActions: {
      type: Boolean,
      default: true
    }
  })

  defineEmits(['open-file', 'delete-file'])

  const { getFileIcon } = useFileIcons()

  const formatDate = dateString => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }
</script>

<style scoped>
  .files-table {
    background: var(--bg-primary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  .table-body {
    flex: 1;
    overflow-y: auto;
    max-height: 60vh;
  }

  .table-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    gap: 16px;
    padding: 12px 16px;
    background: var(--bg-secondary);
    font-size: 13px;
    font-weight: var(--font-semibold);
    color: var(--text-secondary);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  .table-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    gap: 16px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-color);
    align-items: center;
    transition: background-color 0.2s;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    .table-header {
      grid-template-columns: 2fr 1fr 1fr;
      gap: 8px;
      padding: 8px 12px;
    }

    .table-row {
      grid-template-columns: 2fr 1fr 1fr;
      gap: 8px;
      padding: 8px 12px;
    }

    .col-category,
    .col-size {
      display: none;
    }

    .col-actions {
      justify-content: flex-end;
    }
  }

  .table-row:hover {
    background: var(--bg-secondary);
  }

  .col-name {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-primary);
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 15px;
  }

  .col-category,
  .col-status,
  .col-modified,
  .col-size {
    color: var(--text-secondary);
    font-size: 15px;
  }

  .col-actions {
    display: flex;
    gap: 8px;
    font-size: 15px;
  }

  .file-type-icon {
    font-size: 18px;
    color: #ef4444;
  }

  .action-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    color: var(--text-secondary);
    transition: all 0.2s;
  }

  .action-btn:hover {
    background: var(--bg-secondary);
    color: var(--primary-color);
  }

  .action-btn.delete:hover {
    color: #d32f2f;
  }

  .action-btn .material-icons {
    font-size: 16px;
  }

  .status-tag {
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: var(--font-semibold);
  }

  .status-tag.processed {
    background: #e8f5e8;
    color: #2e7d32;
  }

  .status-tag.error {
    background: #ffebee;
    color: #d32f2f;
  }

  .category-tag {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: var(--font-semibold);
  }
</style>
