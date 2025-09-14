<template>
  <AuthLayout
    title="Criar conta"
    description="Crie sua conta para começar a organizar seus documentos de forma inteligente."
  >
    <template #form-content>
      <form @submit.prevent="signup">
        <div class="form-group">
          <input
            type="text"
            class="input-style"
            v-model="name"
            required
            placeholder="Nome completo"
          />
        </div>

        <div class="form-group">
          <input
            type="email"
            class="input-style"
            v-model="email"
            required
            placeholder="E-mail"
          />
        </div>

        <div class="form-group password-group">
          <input
            :type="showPassword ? 'text' : 'password'"
            class="input-style password"
            v-model="password"
            required
            placeholder="Senha"
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

        <div class="form-group password-group">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            class="input-style password"
            v-model="confirmPassword"
            required
            placeholder="Confirmar senha"
          />
          <button
            type="button"
            class="toggle-password"
            @click="toggleConfirmPasswordVisibility"
          >
            <span class="material-icons">{{
              showConfirmPassword ? 'visibility_off' : 'visibility'
            }}</span>
          </button>
        </div>

        <div class="form-group">
          <input
            type="text"
            class="input-style"
            v-model="code"
            required
            placeholder="Código de acesso"
          />
        </div>

        <button
          type="submit"
          class="input-style signup-btn"
          :disabled="isLoading"
          :class="{ loading: isLoading }"
        >
          <span v-if="!isLoading">Criar Conta</span>
          <span v-if="isLoading" class="loading-content">
            <span class="spinner"></span>
            Criando...
          </span>
        </button>

        <div class="auth-link">
          <span>Já tem uma conta? </span
          ><a href="#" @click.prevent="goToLogin" class="bold-link"
            >Faça login</a
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
  import AuthLayout from '../components/AuthLayout.vue'

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
      await AuthService.signup(
        name.value,
        email.value,
        password.value,
        code.value
      )
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

<style scoped>
  .signup-btn.loading {
    background-color: var(--primary-color-hover) !important;
    cursor: not-allowed;
  }
</style>
