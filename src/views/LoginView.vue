<script setup>
import { ref } from 'vue'
import SignupModal from '../components/modal/SignupModal.vue'
import { AuthService } from '@/services/auth.service'
import { useRouter } from 'vue-router'
import Carousel from '../components/Carousel.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const showSignupModal = ref(false)

const login = async () => {
  try {
    const result = await AuthService.login(email.value, password.value);
    console.log('Login bem-sucedido:', result.user);
    router.push('/');
  } catch (error) {
    console.error('Erro no login:', error.message);
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const openSignupModal = () => {
  showSignupModal.value = true
}

const closeSignupModal = () => {
  showSignupModal.value = false
}
</script>

<template>
  <div class="container">
    <div class="login">
      <div class="logo">
        <img src="@/assets/images/doci-logo.png" alt="Doci" class="logo-image" />
      </div>
      <div class="login-container">
        <h1>Bem vindo!</h1>
        <p>Transforme seus documentos em dados inteligentes prontos para análise. Aqui, sua informação trabalha por você.</p>
      </div>
      <form @submit.prevent="login">
        <div class="form-group">
          <input type="email" id="email" class="input-style" v-model="email" required placeholder="Email">
        </div>

        <div class="form-group password-group">
          <input :type="showPassword ? 'text' : 'password'" class="input-style" id="password" v-model="password"
            required placeholder="Senha">
          <button type="button" class="toggle-password" @click="togglePasswordVisibility">
            <span class="material-icons">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
          </button>
        </div>

        <div class="forgot-password">
          <a href="#">Esqueceu a senha?</a>
        </div>

        <button type="submit" class="input-style">Entrar</button>

        <div class="signup-link">
          <span>Não é membro? </span><a href="#" @click.prevent="openSignupModal" class="bold-link">Crie uma conta</a>
        </div>
      </form>
    </div>
    <div class="image-container">
      <div class="image">
        <Carousel  />
      </div>
      <h1 class="caption">Use o Doc.i para transformar documentos soltos em insights de verdade.
        Organize, busque e exporte dados de forma simples e rápida.</h1>
    </div>

  </div>

  <div v-if="showSignupModal" class="modal-overlay">
    <div class="modal-container">
      <SignupModal @close="closeSignupModal" />
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

.login {
  flex: 0.4;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 30px 25px;
  gap: 5%;
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

.login-image {
  width: 100%;
  display: flex;
  align-items: center;
}

form {
  padding-left: 15%;
  padding-right: 15%;
}

.username-group,
.password-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--secondary-color);
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
}

button {
  color: var(--text-light);
  border: none;
  cursor: pointer;
  padding-top: 12px;
  padding-bottom: 12px;
  font-weight: 700;
  transition: background-color 0.3s;
  width: 100%;
}

button[type="submit"]:hover {
  background-color: var(--primary-color-hover);
}

.signup-link {
  text-align: center;
  margin-top: 10px;
}

.signup-link a {
  font-size: 0.9rem;
}

.forgot-password {
  text-align: right;
  margin-bottom: 15px;
}

.login-container {
  text-align: center;
  padding-left: 15%;
  padding-right: 15%;
}

/* Estilos do Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  position: relative;
  background-color: var(--bg-primary);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  width: 30vw;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 50px 45px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.2rem;
  cursor: pointer;
  width: auto;
  padding: 5px;
  z-index: 1001;
}

.close-button:hover {
  color: var(--primary-color);
}


/* Ajustes para o SignupModal dentro do modal */
.modal-container :deep(.container) {
  height: auto;
  width: auto;
  background: none;
}

.modal-container :deep(.signup) {
  width: 100%;
  box-shadow: none;
  padding: 0;
}
</style>