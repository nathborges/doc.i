<script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { Form } from 'vee-validate';

  const valid = ref(false);
  const show1 = ref(false);
  const password = ref('ZG9jLWktcGFzc3dvcmQ=');
  const username = ref('admin@doc-i.com');
  const passwordRules = ref([
    (v: string) => !!v || 'Senha é obrigatória',
    (v: string) => (v && v.length <= 40) || 'Senha deve ter menos de 10 caracteres',
  ]);
  const emailRules = ref([
    (v: string) => !!v || 'E-mail é obrigatório',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
  ]);

  const authStore = useAuthStore();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  function validate(values: any, { setErrors }: any) {
    if (!username.value || !password.value) {
      setErrors({ apiError: 'Preencha todos os campos para fazer o login.' });
      return;
    }
    return authStore.login(username.value, password.value).catch((error) => {
      setErrors({ apiError: 'Erro no login.' });
    });
  }
</script>

<template>
  <Form @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <v-text-field
      v-model="username"
      :rules="emailRules"
      label="Usuário"
      class="mt-4 mb-4 pa-0"
      required
      density="comfortable"
      :hide-details="false"
      variant="outlined"
      color="primary"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Senha"
      required
      density="comfortable"
      variant="outlined"
      color="primary"
      :hide-details="false"
      :append-icon="show1 ? '$eye' : '$eyeOff'"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
      class="pwdInput"
    ></v-text-field>

    <div class="d-sm-flex align-center mt-2 mb-7 mb-sm-0">
      <div class="ml-auto">
        <a href="javascript:void(0)" class="text-primary text-decoration-none">Esqueceu a senha?</a>
      </div>
    </div>
    <v-btn
      color="secondary"
      :loading="isSubmitting"
      block
      class="mt-2"
      variant="flat"
      size="large"
      :disabled="valid"
      type="submit"
    >
      Entrar
    </v-btn>
    <div v-show="errors.apiError" class="mt-2">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
  </Form>
  <div class="mt-5 text-right">
    <v-divider />
    <v-btn variant="plain" to="/register" class="mt-2 mr-n2">Não possui uma conta?</v-btn>
  </div>
</template>
<style lang="scss">
  .custom-devider {
    border-color: rgba(0, 0, 0, 0.08) !important;
  }
  .googleBtn {
    border-color: rgba(0, 0, 0, 0.08);
    margin: 30px 0 20px 0;
  }
  .outlinedInput .v-field {
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: none;
  }
  .orbtn {
    padding: 2px 40px;
    border-color: rgba(0, 0, 0, 0.08);
    margin: 20px 15px;
  }
  .pwdInput {
    position: relative;
    .v-input__append {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .loginForm {
    .v-text-field .v-field--active input {
      font-weight: 500;
    }
  }
</style>
