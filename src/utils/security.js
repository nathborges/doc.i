/**
 * Utilitários de segurança para sanitização e validação
 */

/**
 * Sanitiza dados antes de fazer log para prevenir Log Injection
 */
export const sanitizeForLog = data => {
  if (typeof data === 'string') {
    return encodeURIComponent(data)
  }
  if (typeof data === 'object') {
    return JSON.stringify(data).replace(/[<>]/g, '')
  }
  return String(data)
}

/**
 * Valida parâmetros de entrada
 */
export const validateInput = {
  email: email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return email && typeof email === 'string' && emailRegex.test(email)
  },

  password: password => {
    return password && typeof password === 'string' && password.length >= 6
  },

  required: value => {
    return value !== null && value !== undefined && value !== ''
  }
}

/**
 * Gera token CSRF simples (para desenvolvimento)
 */
export const generateCSRFToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
