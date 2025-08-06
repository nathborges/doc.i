<template>
  <div class="container">
    <div class="signup">
      <div class="signup-container">
        <h1>Criar Conta</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
      </div>
      <form @submit.prevent="signup">
        <div class="form-group">
          <input type="text" id="username" class="input-style" v-model="form.username" required
            placeholder="Nome de usuário">
        </div>
        <div class="form-group">
          <input type="email" id="email" class="input-style" v-model="form.email" required placeholder="E-mail">
        </div>
        <div class="form-group">
          <input type="password" class="input-style" id="password" v-model="form.password" required placeholder="Senha">
        </div>
        <div class="form-group">
          <input type="password" class="input-style" id="confirm-password" v-model="form.confirmPassword" required
            placeholder="Confirmar senha">
        </div>
        <button type="submit" class="input-style">Criar Conta</button>
        <div class="login-link">
          <span>Já tem uma conta? </span>
          <a href="#" @click.prevent="emit('close')" class="bold-link">Faça login</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['close'])

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

function validateForm() {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match.')
    return false
  }
  return true
}

function signup() {
  if (!validateForm()) return
  console.log('Signup attempted:', form.value.username, form.value.email)
  alert('Signup attempted! Check the console for details.')
}
</script>

<style scoped>
// filepath: c:\Users\labsfiap\Downloads\doc.i\src\components\SignupModal.vue
.container {
  width: 100vw;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-secondary);
}
.signup {
  width: 550px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  background-color: var(--bg-primary);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
}
form {
  width: 100%;
}
input {
  border: 1px solid var(--border-color);
  padding-left: 15px;
  padding-top: 12px;
  padding-bottom: 12px;
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
.login-link {
  text-align: center;
  margin-top: 10px;
}
.signup-container {
  text-align: center;
  margin-bottom: 20px;
}
</style>