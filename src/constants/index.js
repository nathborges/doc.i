// Cores para tags de categorias - Paleta com fundo e item
export const CATEGORY_COLORS = [
  { background: '#ede9fe', item: '#7c3aed' }, // Roxo
  { background: '#ecfdf5', item: '#059669' }, // Verde
  { background: '#fef3c7', item: '#d97706' }, // Amarelo
  { background: '#fce7f3', item: '#db2777' }, // Rosa
  { background: '#dbeafe', item: '#2563eb' }, // Azul
  { background: '#f0f9ff', item: '#0284c7' }, // Azul claro
  { background: '#fef2f2', item: '#dc2626' }, // Vermelho
  { background: '#f3f4f6', item: '#6b7280' }  // Cinza
]

// Ícones disponíveis para categorias
export const CATEGORY_ICONS = [
  'folder', 'description', 'business', 'assignment',
  'account_balance', 'receipt', 'people', 'settings'
]

// Configurações da aplicação
export const APP_CONFIG = {
  FILE_PROBABILITY_THRESHOLD: 83,
  NOTIFICATION_DURATION: 5000,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_FILE_TYPES: [
    'pdf', 'doc', 'docx', 'txt', 'rtf',
    'xls', 'xlsx', 'csv',
    'ppt', 'pptx',
    'jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'
  ]
}

// Mensagens de erro padronizadas
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  UNAUTHORIZED: 'Sessão expirada. Faça login novamente.',
  FILE_TOO_LARGE: 'Arquivo muito grande. Máximo 10MB.',
  INVALID_FILE_TYPE: 'Tipo de arquivo não suportado.',
  GENERIC_ERROR: 'Ocorreu um erro inesperado. Tente novamente.'
}

// Rotas da API
export const API_ENDPOINTS = {
  AUTH: '/auth/login',
  FILES: '/upload/files',
  UPLOAD: '/upload',
  SEARCH: '/search',
  CATEGORIES: '/categorias'
}