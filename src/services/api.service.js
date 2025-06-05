import AuthService from './auth.service';

/**
 * Configuração base para chamadas de API
 */
const API_URL = 'https://api.exemplo.com'; // URL base da API (simulada)

/**
 * Serviço para chamadas de API
 */
export const ApiService = {
  /**
   * Realiza uma requisição GET
   * @param {string} endpoint - Endpoint da API
   * @param {Object} params - Parâmetros da requisição
   * @returns {Promise} - Promise com o resultado da requisição
   */
  get(endpoint, params = {}) {
    // Em um cenário real, aqui seria feita uma chamada fetch ou axios
    return this._request('GET', endpoint, params);
  },
  
  /**
   * Realiza uma requisição POST
   * @param {string} endpoint - Endpoint da API
   * @param {Object} data - Dados a serem enviados
   * @returns {Promise} - Promise com o resultado da requisição
   */
  post(endpoint, data = {}) {
    return this._request('POST', endpoint, data);
  },
  
  /**
   * Realiza uma requisição PUT
   * @param {string} endpoint - Endpoint da API
   * @param {Object} data - Dados a serem enviados
   * @returns {Promise} - Promise com o resultado da requisição
   */
  put(endpoint, data = {}) {
    return this._request('PUT', endpoint, data);
  },
  
  /**
   * Realiza uma requisição DELETE
   * @param {string} endpoint - Endpoint da API
   * @param {Object} params - Parâmetros da requisição
   * @returns {Promise} - Promise com o resultado da requisição
   */
  delete(endpoint, params = {}) {
    return this._request('DELETE', endpoint, params);
  },
  
  /**
   * Método interno para realizar requisições
   * @param {string} method - Método HTTP
   * @param {string} endpoint - Endpoint da API
   * @param {Object} data - Dados ou parâmetros
   * @returns {Promise} - Promise com o resultado da requisição
   * @private
   */
  _request(method, endpoint, data = {}) {
    // Simulação de uma chamada de API
    return new Promise((resolve, reject) => {
      // Verifica se o usuário está autenticado para endpoints protegidos
      if (endpoint !== '/auth/login' && endpoint !== '/auth/register') {
        if (!AuthService.isAuthenticated()) {
          reject({ message: 'Não autenticado' });
          return;
        }
      }
      
      // Simula um delay de rede
      setTimeout(() => {
        // Aqui seria implementada a lógica real de chamada à API
        // Por enquanto, apenas retorna dados simulados
        resolve({
          success: true,
          data: { message: `Requisição ${method} para ${endpoint} realizada com sucesso` }
        });
      }, 500);
    });
  }
};

export default ApiService;