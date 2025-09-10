<template>
  <section class="wrapper">
    <!-- Header -->
    <header class="header">
      <div class="user">
        <img :src="profile.avatarUrl" alt="Avatar" class="avatar" />
        <div>
          <h2 class="name">{{ profile.name }}</h2>
          <p class="email">{{ profile.email }}</p>
          <div class="badges">
            <span class="badge">Membro desde {{ profile.memberSince }}</span>
            <span class="badge badge-green">Ativo</span>
          </div>
        </div>
      </div>
    </header>

    <!-- KPIs -->
    <div class="grid kpis">
      <KpiCard icon="📁" :value="formatNumber(stats.files)" label="Arquivos" />
      <KpiCard icon="📂" :value="stats.categories" label="Categorias" />
      <KpiCard icon="🤖" :value="stats.prompts" label="Prompts IA" />
      <KpiCard
        icon="💾"
        :value="`${stats.usedStorage}GB`"
        label="Armazenamento"
      />
    </div>

    <div class="grid two-cols">
      <!-- Dados pessoais -->
      <Card title="Dados Pessoais">
        <div class="form-grid">
          <Field label="Nome Completo"
            ><input v-model="profile.name" type="text"
          /></Field>
          <Field label="E-mail"
            ><input v-model="profile.email" type="email"
          /></Field>
          <Field label="Telefone"
            ><input v-model="profile.phone" type="tel"
          /></Field>
          <Field label="Empresa"
            ><input v-model="profile.company" type="text"
          /></Field>
          <Field label="Bio" class="full">
            <textarea
              v-model="profile.bio"
              rows="3"
              placeholder="Conte-nos um pouco sobre você..."
            ></textarea>
          </Field>
        </div>
      </Card>

      <!-- Plano atual -->
      <Card title="Plano Atual">
        <div class="plan">
          <div class="plan-icon">👑</div>
          <div>
            <h3 class="plan-name">{{ plan.name }}</h3>
            <p class="muted">R$ {{ plan.price }}/mês</p>
          </div>
        </div>
        <div class="meter">
          <div class="label">Armazenamento</div>
          <ProgressBar :value="storagePct" />
          <div class="hint">
            {{ stats.usedStorage }}GB / {{ plan.storageLimit }}GB
          </div>
        </div>
        <div class="meter">
          <div class="label">Prompts IA</div>
          <ProgressBar :value="promptsPct" />
          <div class="hint">{{ stats.prompts }} / {{ plan.promptsLimit }}</div>
        </div>
        <button class="btn primary w100" @click="onManage">
          Gerenciar Plano
        </button>
      </Card>
    </div>

    <div class="grid two-cols">
      <!-- Preferências -->
      <Card title="Preferências">
        <div class="form-grid single">
          <Field label="Idioma">
            <select v-model="prefs.language">
              <option>Português (Brasil)</option>
              <option>English (US)</option>
              <option>Español</option>
            </select>
          </Field>
          <Field label="Fuso Horário">
            <select v-model="prefs.timezone">
              <option>GMT-3 (São Paulo)</option>
              <option>GMT-4 (Manaus)</option>
              <option>GMT-5 (Acre)</option>
              <option>UTC</option>
            </select>
          </Field>
          <label class="switch">
            <input type="checkbox" v-model="prefs.darkTheme" />
            <span> Tema escuro</span>
          </label>
        </div>
      </Card>

      <!-- Atividade recente -->
      <Card title="Atividade Recente">
        <ul class="activity">
          <li
            v-for="item in recentActivity"
            :key="item.id"
            class="activity-item"
          >
            <span class="dot" :class="item.status"></span>
            <div>
              <div class="activity-title">{{ item.title }}</div>
              <div class="muted">{{ item.when }}</div>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  </section>
</template>

<script setup>
  import { computed, reactive } from 'vue'

  // Mock data
  const profile = reactive({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '+55 11 99999-9999',
    company: 'TechCorp Ltd.',
    bio: '',
    memberSince: '2024',
    avatarUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&h=200&fit=crop&auto=format'
  })

  const stats = reactive({
    files: 1247,
    categories: 18,
    prompts: 342,
    usedStorage: 45.2
  })
  const plan = reactive({
    name: 'Plano Pro',
    price: '29,90',
    storageLimit: 100,
    promptsLimit: 1000
  })
  const prefs = reactive({
    language: 'Português (Brasil)',
    timezone: 'GMT-3 (São Paulo)',
    darkTheme: false
  })
  const recentActivity = reactive([
    { id: 1, title: 'Upload de 5 arquivos', when: 'há 2 horas', status: 'ok' },
    { id: 2, title: 'Prompt IA executado', when: 'há 3 horas', status: 'info' },
    { id: 3, title: 'Nova categoria criada', when: 'ontem', status: 'ok' }
  ])

  // Computed
  const storagePct = computed(() =>
    Math.min(100, Math.round((stats.usedStorage / plan.storageLimit) * 100))
  )
  const promptsPct = computed(() =>
    Math.min(100, Math.round((stats.prompts / plan.promptsLimit) * 100))
  )

  // Methods
  const formatNumber = n => n.toLocaleString('pt-BR')
  const onManage = () => alert('Abrir página de gerenciamento do plano…')
</script>

<script>
  export default {
    components: {
      KpiCard: {
        props: ['icon', 'value', 'label'],
        template: `
        <div class="card kpi">
          <div class="kpi-icon">{{ icon }}</div>
          <div class="kpi-value">{{ value }}</div>
          <div class="kpi-label">{{ label }}</div>
        </div>
      `
      },
      Card: {
        props: ['title'],
        template: `
        <section class="card">
          <header class="card-head" v-if="title">
            <h3>{{ title }}</h3>
          </header>
          <div class="card-body">
            <slot></slot>
          </div>
        </section>
      `
      },
      Field: {
        props: ['label'],
        template: `
        <label class="field">
          <span class="field-label" v-if="label">{{ label }}</span>
          <slot></slot>
        </label>
      `
      },
      ProgressBar: {
        props: { value: { type: Number, default: 0 } },
        template: `
        <div class="progress">
          <div class="bar" :style="{ width: value + '%' }"></div>
        </div>
      `
      }
    }
  }
</script>

<style scoped>
  :root {
    --bg: #f7f8fb;
    --card: #ffffff;
    --text: #0f172a;
    --muted: #64748b;
    --border: #e5e7eb;
    --primary: #2563eb;
  }

  .wrapper {
    background: var(--bg);
    color: var(--text);
    padding: 20px;
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 18px 20px;
    box-shadow: 0 1px 2px rgb(15 23 42 / 5%);
  }

  .user {
    display: flex;
    gap: 14px;
    align-items: center;
  }

  .avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
  }

  .name {
    font-size: 20px;
    margin: 0 0 4px;
  }

  .email {
    margin: 0;
    color: var(--muted);
    font-size: 14px;
  }

  .badges {
    display: flex;
    gap: 8px;
    margin-top: 6px;
  }

  .badge {
    background: #eef2ff;
    color: #1d4ed8;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
  }

  .badge-green {
    background: #dcfce7;
    color: #166534;
  }

  /* Buttons */
  .btn {
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--text);
    padding: 8px 12px;
    border-radius: 10px;
    cursor: pointer;
  }

  .btn:hover {
    filter: brightness(0.98);
  }

  .btn.primary {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }

  .btn.w100 {
    width: 100%;
    margin-top: 12px;
  }

  /* Grid */
  .grid {
    display: grid;
    gap: 16px;
    margin-top: 16px;
  }

  .kpis {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .two-cols {
    grid-template-columns: 2fr 1fr;
  }

  @media (max-width: 980px) {
    .kpis {
      grid-template-columns: repeat(2, 1fr);
    }
    .two-cols {
      grid-template-columns: 1fr;
    }
  }

  /* Cards */
  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: 0 1px 2px rgb(15 23 42 / 5%);
  }

  .card-head {
    padding: 14px 16px;
    border-bottom: 1px solid var(--border);
  }

  .card-head h3 {
    margin: 0;
    font-size: 16px;
  }

  .card-body {
    padding: 16px;
  }

  /* KPI card */
  .kpi {
    display: grid;
    grid-template-rows: auto auto auto;
    gap: 4px;
    text-align: center;
    padding: 18px;
  }

  .kpi-icon {
    font-size: 24px;
  }

  .kpi-value {
    font-weight: 700;
    font-size: 22px;
  }

  .kpi-label {
    color: var(--muted);
    font-size: 12px;
  }

  /* Form */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .form-grid.single {
    grid-template-columns: 1fr;
  }

  .field {
    display: grid;
    gap: 6px;
  }

  .field.full {
    grid-column: 1 / -1;
  }

  .field-label {
    font-size: 12px;
    color: var(--muted);
  }

  input,
  textarea,
  select {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 10px 12px;
    color: var(--text);
    outline: none;
  }

  input:focus,
  textarea:focus,
  select:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgb(37 99 235 / 15%);
  }

  /* Plan */
  .plan {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  .plan-icon {
    font-size: 26px;
  }

  .plan-name {
    margin: 0;
  }

  .muted {
    color: var(--muted);
    font-size: 12px;
  }

  .meter {
    margin: 14px 0;
  }

  .meter .label {
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 6px;
  }

  .hint {
    text-align: right;
    font-size: 12px;
    color: var(--muted);
    margin-top: 6px;
  }

  .progress {
    width: 100%;
    height: 8px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 999px;
    overflow: hidden;
  }

  .progress .bar {
    height: 100%;
    background: var(--primary);
  }

  /* Preferences */
  .switch {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }

  /* Activity */
  .activity {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 12px;
  }

  .activity-item {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .activity-title {
    font-size: 14px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    display: inline-block;
    background: #cbd5e1;
  }

  .dot.ok {
    background: #22c55e;
  }

  .dot.info {
    background: #60a5fa;
  }
</style>
