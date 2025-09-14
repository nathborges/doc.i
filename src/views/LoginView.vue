<template>
  <AuthLayout
    title="Bem vindo!"
    description="Crie sua conta para começar a organizar seus documentos de forma inteligente."
  >
    <template #form-content>
      <form @submit.prevent="login">
        <div class="form-group">
          <input
            type="email"
            id="email"
            class="input-style"
            :class="{ error: hasError, shake: shakeForm }"
            v-model="email"
            required
            placeholder="Email"
            @input="clearError"
          />
        </div>

        <div class="form-group password-group">
          <input
            :type="showPassword ? 'text' : 'password'"
            class="input-style password"
            :class="{ error: hasError, shake: shakeForm }"
            id="password"
            v-model="password"
            required
            placeholder="Senha"
            @input="clearError"
          />
          <button
            type="button"
            class="toggle-password"
            @click="togglePasswordVisibility"
          >
            <span class="material-icons">{{
              showPassword ? 'visibility_off' : 'visibility'
            }}</span>
          </button>
        </div>

        <div v-if="hasError" class="error-message">
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          class="input-style login-btn"
          :disabled="isLoading"
          :class="{ loading: isLoading }"
        >
          <span v-if="!isLoading">Entrar</span>
          <span v-if="isLoading" class="loading-content">
            <span class="spinner"></span>
            Entrando...
          </span>
        </button>

        <div class="auth-link">
          <div class="forgot-password">
            <a href="#">Esqueceu a senha?</a>
          </div>
          <span>Não é membro? </span
          ><a href="#" @click.prevent="goToSignup" class="bold-link"
            >Crie uma conta</a
          >
        </div>
      </form>
    </template>
  </AuthLayout>
</template>

<script setup>
  import { ref } from 'vue'
  import { AuthService } from '@/services/auth.service'
  import { useRouter } from 'vue-router'
  import AuthLayout from '@/components/AuthLayout.vue'

  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const showPassword = ref(false)

  const isLoading = ref(false)
  const hasError = ref(false)
  const errorMessage = ref('')
  const shakeForm = ref(false)

  const login = async () => {
    isLoading.value = true
    try {
      const result = await AuthService.login(email.value, password.value)
      console.log('Login bem-sucedido:', result.user)
      router.push('/')
    } catch (error) {
      console.error('Erro no login:', error.message)
      hasError.value = true
      errorMessage.value = 'Email ou senha incorretos'
      shakeForm.value = true
      setTimeout(() => (shakeForm.value = false), 400)
    } finally {
      isLoading.value = false
    }
  }

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
  }

  const goToSignup = () => {
    router.push('/signup')
  }

  const clearError = () => {
    hasError.value = false
  }
</script>

<style scoped>
  input.error {
    border: 1px solid #e53e3e;
  }

  .error-message {
    color: #e53e3e;
    font-weight: 500;
    font-size: 15px;
    margin-top: 5px;
    text-align: center;
    margin-bottom: 10px;
  }

  .forgot-password {
    text-align: right;
    margin-bottom: 15px;
  }

  .login-btn.loading {
    background-color: var(--primary-color-hover) !important;
    cursor: not-allowed;
  }

  input.shake {
    animation: shake 0.4s ease-in-out;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-2px);
    }
    75% {
      transform: translateX(2px);
    }
  }
</style>
