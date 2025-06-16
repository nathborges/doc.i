<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['close'])

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const signup = () => {
  // Aqui você implementaria a lógica de criação de conta
  console.log('Cadastro tentado:', username.value, email.value)
  alert('Cadastro tentado! Verifique o console para detalhes.')
}
</script>

<template>
  <div class="container">
    <div class="signup">
      <div class="signup-container">
        <h1>Criar Conta</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
      </div>
      <form @submit.prevent="signup">
        <div class="form-group">
          <input type="text" id="username" class="input-style" v-model="username" required
            placeholder="Nome de usuário">
        </div>

        <div class="form-group">
          <input type="email" id="email" class="input-style" v-model="email" required placeholder="E-mail">
        </div>

        <div class="form-group">
          <input type="password" class="input-style" id="password" v-model="password" required placeholder="Senha">
        </div>

        <div class="form-group">
          <input type="password" class="input-style" id="confirm-password" v-model="confirmPassword" required
            placeholder="Confirmar senha">
        </div>

        <button type="submit" class="input-style">Criar Conta</button>

        <div class="login-link">
          <span>Já tem uma conta? </span><a href="#" @click.prevent="$emit('close')" class="bold-link">Faça login</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
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

.image {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-secondary);
  padding: 20px;
  margin-left: -50px;
}

.image-caption {
  margin-top: 20px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 80%;
}

.login-image {
  max-width: 60%;
  max-height: 60%;
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