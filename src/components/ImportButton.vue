<template>
    <div>
        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none"
            accept=".pdf,.jpg,.png" :multiple="true" />
        <BaseButton text="Importar" icon="add" @click="openFileSelector" />
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { FileService } from '@/services/files.service'
import BaseButton from './BaseButton.vue'

const props = defineProps({
    category: {
        type: String,
        default: ""
    },
})

const category = ref(null)
const showNotification = inject('showNotification')
const emit = defineEmits(['file-uploaded'])
const fileInput = ref(null)

const openFileSelector = () => {
    fileInput.value.click()
}

const handleFileChange = async (event) => {
    const files = event.target.files
    if (files && files.length > 0) {
        
        for (const file of Array.from(files)) {
            try {
                await FileService.upload([file])
                emit('file-uploaded')
                showNotification(file.name, 'success', 5000)
            } catch (error) {
                console.error('Erro no upload:', error)
                showNotification(file.name, 'error', 5000)
            }
        }
    }
}
</script>


<style scoped>

</style>