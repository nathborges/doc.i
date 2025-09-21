import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import { useAuthStore } from '@/stores/auth';

import { fakeBackend } from '@/utils/helpers/fake-backend';

// print
import print from 'vue3-print-nb';

const app = createApp(App);
fakeBackend();
app.use(router);
app.use(PerfectScrollbarPlugin);
const pinia = createPinia();
app.use(pinia);
app.use(VueTablerIcons);
app.use(print);
app.use(VueApexCharts);
app.use(vuetify);

// Inicializa autenticação após Pinia estar configurado
const authStore = useAuthStore();
authStore.initializeAuth();

app.mount('#app');
