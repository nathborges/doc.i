<template>
  <div class="insight-generator">
    <div class="generator-header">
      <div class="header-content">
        <div class="icon-wrapper">
          <span class="material-icons">lightbulb</span>
        </div>
        <div class="header-text">
          <h3>Gerador de Insights</h3>
          <p>Gere insights automáticos sobre os documentos desta categoria</p>
        </div>
      </div>
    </div>

    <div class="generator-container">
      <div class="text-area">
        <div v-if="insightText" class="insight-text">{{ insightText }}</div>
        <div v-else class="placeholder-text">
          Clique em "Gerar Insight" para obter análises automáticas sobre os
          documentos desta categoria
        </div>
      </div>
      <div class="action-buttons">
        <BaseButton
          class="generate-btn"
          :text="isGenerating ? 'Gerando...' : 'Gerar Insight'"
          :icon="isGenerating ? 'refresh' : 'auto_awesome'"
          :disabled="isGenerating"
          @click="generateInsights"
        />
        <BaseButton
          class="export-btn"
          text="Exportar"
          icon="download"
          variant="secondary"
          :disabled="!insightText"
          @click="exportInsights"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useGlobalState } from '@/composables/useGlobalState'
  import BaseButton from '../BaseButton.vue'

  const props = defineProps({
    category: {
      type: String,
      required: true
    }
  })

  const emit = defineEmits(['insights-generated'])

  const isGenerating = ref(false)
  const insightText = ref('')
  const { addNotification } = useGlobalState()

  const generateInsights = async () => {
    isGenerating.value = true

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      insightText.value = `Análise da categoria "${props.category}":

• Total de documentos: 127 arquivos
• Crescimento mensal: +23% em relação ao mês anterior
• Documento mais recente: Adicionado há 2 dias
• Tamanho total: 2.4 GB de dados
• Principais colaboradores: 5 usuários ativos
• Tipos de arquivo: PDF (60%), Word (25%), Excel (15%)
• Período de maior atividade: Últimas 2 semanas
• Status de processamento: 95% dos documentos processados
• Palavras-chave mais frequentes: contrato, relatório, análise
• Recomendação: Considere arquivar documentos com mais de 1 ano`

      addNotification({
        type: 'success',
        message: 'Insight gerado com sucesso!'
      })

      emit('insights-generated', insightText.value)
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Erro ao gerar insight. Tente novamente.'
      })
    } finally {
      isGenerating.value = false
    }
  }

  const exportInsights = () => {
    if (!insightText.value) return

    const blob = new Blob([insightText.value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `insights-${props.category}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    addNotification({
      type: 'success',
      message: 'Insight exportado com sucesso!'
    })
  }
</script>

<style scoped>
  .insight-generator {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
  }

  .generator-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-wrapper .material-icons {
    color: white;
    font-size: 24px;
  }

  .header-text h3 {
    margin: 0 0 4px 0;
    font-size: 18px;
    font-weight: var(--font-semibold);
    color: var(--text-primary);
  }

  .header-text p {
    margin: 0;
    font-size: 14px;
    color: var(--text-secondary);
  }

  .generator-container {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  .text-area {
    flex: 1;
    min-height: 120px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 16px;
    font-size: 14px;
    line-height: 1.5;
  }

  .insight-text {
    color: var(--text-primary);
    white-space: pre-line;
  }

  .placeholder-text {
    color: var(--text-secondary);
    font-style: italic;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  :deep(.generate-btn) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    color: white !important;
  }

  :deep(.generate-btn:hover:not(:disabled)) {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%) !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  :deep(.generate-btn .material-icons.loading) {
    animation: spin 1s linear infinite;
  }

  .loading {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
