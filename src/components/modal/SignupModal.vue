<script setup>
import { ref, defineEmits } from 'vue'
import ModalWrapper from './ModalWrapper.vue'
import BaseButton from '../BaseButton.vue'
import { AuthService } from '@/services/auth.service'

const emit = defineEmits(['close'])

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const code = ref('')

const signup = async () => {
  if (password.value !== confirmPassword.value) {
    alert('As senhas não coincidem!')
    return
  }

  try {
    await AuthService.signup(name.value, email.value, password.value, code.value)
    alert('Conta criada com sucesso!')
    emit('close')
  } catch (error) {
    console.error('Erro ao criar conta:', error)
    alert('Erro ao criar conta. Tente novamente.')
  }
}
</script>

<template>
  <ModalWrapper title="Criar Conta" description="Crie sua conta para começar a organizar seus documentos de forma inteligente." @close="$emit('close')">
    <form @submit.prevent="signup">
      <div class="form-group">
        <input type="text" v-model="name" required placeholder="Nome completo">
      </div>

      <div class="form-group">
        <input type="email" v-model="email" required placeholder="E-mail">
      </div>

      <div class="form-group">
        <input type="password" v-model="password" required placeholder="Senha">
      </div>

      <div class="form-group">
        <input type="password" v-model="confirmPassword" required placeholder="Confirmar senha">
      </div>

      <div class="form-group">
        <input type="text" v-model="code" required placeholder="Código de acesso">
      </div>

      <div class="login-link">
        <span>Já tem uma conta? </span><a href="#" @click.prevent="$emit('close')" class="bold-link">Faça login</a>
      </div>
    </form>

    <template #footer>
      <BaseButton text="Criar Conta" @click="signup" />
    </template>
  </ModalWrapper>
</template>

<style scoped>
form {
  width: 100%;
}

.form-group {
  margin-bottom: 16px;
}

input {
  width: 100%;
  border: 1px solid var(--border-color);
  padding: 12px 15px;
  border-radius: 8px;
  font-size: 14px;
}

.login-link {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
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