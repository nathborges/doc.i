<template>
    <div>
        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" accept=".pdf,.doc,.png"
            :multiple="true" />
        <button class="btn" @click="openFileSelector">
            <slot>+ Importar</slot>
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    multiple: {
        type: Boolean,
        default: false
    }
})

import { inject } from 'vue'

// Obtém a função de notificação
const showNotification = inject('showNotification')

// Exemplo de uso
function mostrarExemplo() {
  // Parâmetros: mensagem, tipo (info, success, warning, error), duração em ms
  showNotification('Operação realizada com sucesso!', 'success', 5000)
}

const emit = defineEmits(['file-selected'])
const fileInput = ref(null)

const openFileSelector = () => {
    fileInput.value.click()
}

const handleFileChange = (event) => {
    const files = event.target.files
    console.log(files);
    if (files && files.length > 0) {
        if (props.multiple) {
            emit('file-selected', files)
        } else {
            const file = files[0]
            emit('file-selected', file)
        }
        Array.from(files).forEach(element => {
            showNotification(element.name, 'success', 5000)
        });
    }
}
</script>


<style scoped>
.btn {
    padding:14px 23px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid var(--border-color);
    width: 100%;
}

.btn:hover {
    background-color: var(--primary-color-hover);
}
</style>