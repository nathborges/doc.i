<template>
    <div>
        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" accept=".pdf,.docx,.doc,.png"
            :multiple="true" />
        <button class="btn" @click="openFileSelector">
             <span class="material-icons">add</span>
             Importar
        </button>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { FileService } from '@/services/files.service'
import { currentCategory } from '@/store/BaseViewState'

const props = defineProps({
    multiple: {
        type: Boolean,
        default: false
    },
})

const category = ref(null)
const showNotification = inject('showNotification')
const emit = defineEmits(['file-selected'])
const fileInput = ref(null)

const openFileSelector = () => {
    fileInput.value.click()
}

const handleFileChange = (event) => {
    const files = event.target.files
    if (files && files.length > 0) {
        Array.from(files).forEach(async file => {
            try {
                await FileService.upload([file], category.value || 'sem_categoria')
                showNotification(file.name, 'success', 5000)
            } catch (error) {
                console.error('Erro no upload:', error)
                showNotification(file.name, 'error', 5000)
            }
        });
    }
}

onMounted(() => {
    category.value = currentCategory.value
})
</script>


<style scoped>
.btn {
    padding:14px 23px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid var(--border-color);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.btn:hover {
    background-color: var(--primary-color-hover);
}
</style>