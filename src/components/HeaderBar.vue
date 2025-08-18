<template>
    <div class="header">
        <div class="header-title">
            <div class="user-profile">
                <div class="upload-button">
                    <BaseButton 
                        text="Importar" 
                        icon="upload" 
                        variant="primary" 
                        size="small" 
                        @click="openUploadModal" 
                    />
                </div>
                <div class="notifications">
                    <span class="material-icons">notifications</span>
                </div>
                <div class="avatar" @click="toggleUserMenu"><span class="material-icons">person</span>
                </div>
                <div v-if="showUserMenu" class="user-menu">
                    <div class="user-menu-item">
                        <span class="material-icons">settings</span>
                        <span>Configurações</span>
                    </div>
                    <div class="user-menu-item logout" @click="logout">
                        <span class="material-icons">logout</span>
                        <span>Sair</span>
                    </div>
                </div>
            </div>
        </div>
        <UploadModal :isOpen="showUploadModal" @close="closeUploadModal" @file-uploaded="handleFileUploaded" />
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '@/services/auth.service'
import { FileService } from '@/services/files.service'
import BaseButton from './BaseButton.vue'
import UploadModal from './modal/UploadModal.vue'

const router = useRouter()
const showUserMenu = ref(false)
const showUploadModal = ref(false)
const showNotification = inject('showNotification')

const emit = defineEmits(['file-uploaded'])

defineProps({
    title: String
})

const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
}

const logout = () => {
    AuthService.logout()
    router.push('/login')
}

const openUploadModal = () => {
    showUploadModal.value = true
}

const closeUploadModal = () => {
    showUploadModal.value = false
}

const handleFileUploaded = () => {
    emit('file-uploaded')
}
</script>

<style scoped>
.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.header-title {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
}


.user-profile {
    display: flex;
    align-items: center;
    gap: 12px;
}

.notifications {
    position: relative;
    cursor: pointer;
    width: 36px;
    height: 36px;
    background-color: #f3f4f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    transition: background-color 0.2s;
}

.notifications:hover {
    background-color: #e5e7eb;
}

.avatar {
    width: 36px;
    height: 36px;
    background-color: #f3f4f6;
    color: #6b7280;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: background-color 0.2s;
}

.avatar:hover {
    background-color: #e5e7eb;
}

.user-menu {
    position: absolute;
    top: 50px;
    right: 0;
    background-color: var(--bg-primary);
    border-radius: 12px;
    box-shadow: var(--shadow-lg);
    width: 200px;
    z-index: 100;
    border: 1px solid var(--border-color);
    overflow: hidden;
}

.user-menu-item {
    padding: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s;
    color: var(--text-primary);
}

.user-menu-item:hover {
    background-color: var(--bg-secondary);
}

.user-menu-item.logout {
    border-top: 1px solid var(--border-color);
    color: var(--error-color);
}

.user-menu-item svg {
    margin-right: 12px;
    width: 16px;
}

.upload-button {
    position: relative;
}


</style>