<script setup>
import { ref } from 'vue'
import { AuthService } from '@/services/auth.service'
import { useRouter } from 'vue-router'
import Carousel from '../components/Carousel.vue'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const code = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)

const signup = async () => {
  if (password.value !== confirmPassword.value) {
    alert('As senhas não coincidem!')
    return
  }

  isLoading.value = true
  try {
    await AuthService.signup(name.value, email.value, password.value, code.value)
    alert('Conta criada com sucesso!')
    router.push('/login')
  } catch (error) {
    console.error('Erro ao criar conta:', error)
    alert('Erro ao criar conta. Tente novamente.')
  } finally {
    isLoading.value = false
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="container">
    <div class="signup">
      <div class="logo">
        <img src="@/assets/images/doci-logo.png" alt="Doci" class="logo-image" />
      </div>
      <div class="signup-container">
        <h1>Criar Conta</h1>
        <p>Crie sua conta para começar a organizar seus documentos de forma inteligente.</p>
      </div>
      <form @submit.prevent="signup">
        <div class="form-group">
          <input type="text" class="input-style" v-model="name" required placeholder="Nome completo">
        </div>

        <div class="form-group">
          <input type="email" class="input-style" v-model="email" required placeholder="E-mail">
        </div>

        <div class="form-group password-group">
          <input :type="showPassword ? 'text' : 'password'" class="input-style" v-model="password"
            required placeholder="Senha">
          <button type="button" class="toggle-password" @click="togglePasswordVisibility">
            <span class="material-icons">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
          </button>
        </div>

        <div class="form-group password-group">
          <input :type="showConfirmPassword ? 'text' : 'password'" class="input-style" v-model="confirmPassword"
            required placeholder="Confirmar senha">
          <button type="button" class="toggle-password" @click="toggleConfirmPasswordVisibility">
            <span class="material-icons">{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</span>
          </button>
        </div>

        <div class="form-group">
          <input type="text" class="input-style" v-model="code" required placeholder="Código de acesso">
        </div>

        <button type="submit" class="input-style signup-btn" :disabled="isLoading" :class="{ 'loading': isLoading }">
          <span v-if="!isLoading">Criar Conta</span>
          <span v-if="isLoading" class="loading-content">
            <span class="spinner"></span>
            Criando...
          </span>
        </button>

        <div class="login-link">
          <span>Já tem uma conta? </span><a href="#" @click.prevent="goToLogin" class="bold-link">Faça login</a>
        </div>
      </form>
    </div>
    <div class="image-container">
      <div class="image">
        <Carousel />
      </div>
      <h1 class="caption animate-item" style="animation-delay: 0.2s">Use o Doc.i para transformar documentos soltos em insights de verdade.
        Organize, busque e exporte dados de forma simples e rápida.</h1>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  margin: 0 auto;
  display: flex;
  height: 100vh;
  align-items: stretch;
  gap: 0;
  overflow: hidden;
}

.signup {
  flex: 0.4;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 30px 25px;
  gap: 3%;
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-lg);
  z-index: 1;
}

.image-container {
  flex: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-secondary);
  padding: 30px 25px;
  margin-left: 0;
  position: relative;
  gap: 50px;
}

.caption {
  text-align: center;
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  max-width: 80%;
  line-height: 1.4;
}

form {
  padding-left: 15%;
  padding-right: 15%;
}

.form-group {
  margin-bottom: 13px;
}

.password-group {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none !important;
  border: none;
  color: var(--secondary-color);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 5px;
  width: auto;
  margin: 0;
}

.toggle-password:hover {
  background: none !important;
  color: var(--secondary-color-hover);
}

input {
  border: 1px solid var(--border-color);
  padding-left: 30px;
  transition: all 0.3s ease;
}

.toggle-password:hover {
  transform: translateY(-50%) !important;
  box-shadow: none !important;
}


input:focus {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-color: var(--primary-color);
}

button {
  color: var(--text-light);
  border: none;
  cursor: pointer;
  padding-top: 12px;
  padding-bottom: 12px;
  font-weight: 700;
  transition: all 0.3s ease;
  width: 100%;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

button[type="submit"]:hover {
  background-color: var(--primary-color-hover);
}

.login-link {
  text-align: center;
  margin-top: 10px;
}

.login-link a {
  font-size: 0.9rem;
}

.signup-container {
  text-align: center;
  padding-left: 15%;
  padding-right: 15%;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

.logo-image {
  max-height: 50px;
  width: auto;
}

.signup-btn {
  transition: all 0.3s ease;
}

.signup-btn.loading {
  background-color: var(--primary-color-hover) !important;
  cursor: not-allowed;
}

.loading-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-item {
  animation: slideInUp 1.2s ease-out both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bold-link {
  font-weight: 600;
  color: var(--primary-color);
  text-decoration: none;
}

.bold-link:hover {
  text-decoration: underline;
}
</style>