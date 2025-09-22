<script setup lang="ts">
  import { ref } from 'vue';
  import { AuthService } from '@/services/auth.service';
  import { Form } from 'vee-validate';
  import { useRouter } from 'vue-router';
  const show1 = ref(false);
  const password = ref('');
  const email = ref('');
  const firstname = ref('');
  const lastname = ref('');
  const code = ref('');
  const router = useRouter();

  const passwordRules = ref([
    (v: string) => !!v || 'Senha é obrigatória',
    (v: string) => (v && v.length >= 6) || 'Senha deve ter pelo menos 6 caracteres',
  ]);
  const emailRules = ref([
    (v: string) => !!v || 'E-mail é obrigatório',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
  ]);

  function validate(values: any, { setErrors }: any) {
    const name = `${firstname.value} ${lastname.value}`.trim();
    console.log(!name || !email.value || !password.value || !code.value);
    if (!name || !email.value || !password.value || !code.value) {
      return setErrors({ apiError: 'Preencha todos os campos para continuar.' });
    }
    return AuthService.createUser({
      name,
      email: email.value,
      password: password.value,
      code: code.value,
    })
      .then(() => {
        router.push('/login');
      })
      .catch((error: any) => {
        setErrors({ apiError: 'Erro no cadastro.' });
      });
  }
</script>

<template>
  <Form @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <v-row>
      <v-col cols="12" sm="6" class="pt-0">
        <v-text-field
          v-model="firstname"
          density="comfortable"
          hide-details="auto"
          variant="outlined"
          color="primary"
          label="Nome"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" class="pt-0">
        <v-text-field
          v-model="lastname"
          density="comfortable"
          hide-details="auto"
          variant="outlined"
          color="primary"
          label="Sobrenome"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-text-field
      v-model="email"
      label="E-mail"
      class="mt-4 mb-4"
      required
      density="comfortable"
      hide-details="auto"
      variant="outlined"
      color="primary"
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Senha"
      required
      density="comfortable"
      variant="outlined"
      color="primary"
      hide-details="auto"
      :append-icon="show1 ? '$eye' : '$eyeOff'"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
      class="pwdInput"
    ></v-text-field>
    <v-text-field
      v-model="code"
      label="Código de Convite"
      class="mt-4 mb-4"
      density="comfortable"
      hide-details="auto"
      variant="outlined"
      color="primary"
    ></v-text-field>
    <v-btn
      color="secondary"
      :loading="isSubmitting"
      block
      class="mt-1"
      variant="flat"
      size="large"
      type="submit"
    >
      Criar uma conta
    </v-btn>
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
  </Form>
  <div class="mt-5 text-right">
    <v-divider />
    <v-btn variant="plain" to="/login" class="mt-2 mr-n2">Já possui uma conta?</v-btn>
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
</style>
