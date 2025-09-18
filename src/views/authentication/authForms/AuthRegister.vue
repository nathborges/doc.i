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

  /* eslint-disable @typescript-eslint/no-explicit-any */
  function validate(values: any, { setErrors }: any) {
    const name = `${firstname.value} ${lastname.value}`.trim();
    return AuthService.signup(name, email.value, password.value, code.value)
      .then(() => {
        router.push('/login1');
      })
      .catch((error) => {
        setErrors({ apiError: error.response?.data?.message || 'Erro no cadastro' });
      });
  }
</script>

<template>
  <Form @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="firstname"
          density="comfortable"
          hide-details="auto"
          variant="outlined"
          color="primary"
          label="Nome"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
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
      :rules="emailRules"
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
      :rules="passwordRules"
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
    <!-- 
    <div class="d-sm-inline-flex align-center mt-2 mb-7 mb-sm-0 font-weight-bold">
      <v-checkbox
        v-model="checkbox"
        :rules="[(v: any) => !!v || 'Você deve concordar para continuar!']"
        label="Concordar com?"
        required
        color="primary"
        class="ms-n2"
        hide-details
      ></v-checkbox>
      <a href="#" class="ml-1 text-lightText">Termos e Condições</a>
    </div> -->
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
      class="mt-2"
      variant="flat"
      size="large"
      type="submit"
    >
      Cadastrar
    </v-btn>
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
  </Form>
  <div class="mt-5 text-right">
    <v-divider />
    <v-btn variant="plain" to="/login1" class="mt-2 mr-n2">Já possui uma conta?</v-btn>
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
