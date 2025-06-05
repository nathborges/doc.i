<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const showPassword = ref(false)

// ... resto do código

// const login = async () => {
//   try {
//     const result = await AuthService.login(username.value, password.value);
//     console.log('Login bem-sucedido:', result.user);
//     // Redireciona para a página inicial após o login
//     router.push('/');
//   } catch (error) {
//     console.error('Erro no login:', error.message);
//     alert('Erro no login: ' + error.message);
//   }
// }

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
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
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed
          erat molestie vehicula.</p>
      </div>
      <form @submit.prevent="login">
        <div class="form-group">
          <input type="text" id="username" class="input-style" v-model="username" required placeholder="Usuário">
        </div>

        <div class="form-group password-group">
          <input :type="showPassword ? 'text' : 'password'" class="input-style" id="password" v-model="password"
            required placeholder="Senha">
          <button type="button" class="toggle-password" @click="togglePasswordVisibility">
            <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
          </button>
        </div>

        <div class="forgot-password">
          <a href="#">Esqueceu a senha?</a>
        </div>

        <button type="submit" class="input-style">Entrar</button>

        <div class="divider"></div>

        <div class="signup-link">
          <span>Não é membro? </span><router-link to="/signup" class="bold-link">Crie uma conta</router-link>
        </div>
      </form>
    </div>
    <div class="image">
      <img src="@/assets/images/login-image.svg" alt="Login Illustration" class="login-image">
      <h1 class="image-caption">Use o Doc.i para deixar seu trabalho mais criativo e divertido</h1>
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
  padding-top: 3%;
  gap: 5%;
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-lg);
  z-index: 1;
}

.image {
  flex: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-secondary);
  padding: 20px;
  margin-left: 0;
  position: relative;
}

.logo {
  height: 100px;
}

.logo-image {
  height: 100%;
}

.image-caption {
  margin-top: 40px;
  text-align: center;
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  max-width: 80%;
  line-height: 1.4;
}

.login-image {
  max-width: 60%;
  max-height: 60%;
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

.input-style {
  width: 100%;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 400;
}

button {
  background-color: var(--primary-color);
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
</style>