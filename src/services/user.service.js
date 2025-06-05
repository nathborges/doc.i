import ApiService from './api.service';

/**
 * Serviço para operações relacionadas a usuários
 */
export const UserService = {
  /**
   * Obtém o perfil do usuário atual
   * @returns {Promise} - Promise com os dados do perfil
   */
  getProfile() {
    return ApiService.get('/user/profile');
  },
  
  /**
   * Atualiza o perfil do usuário
   * @param {Object} userData - Dados do usuário a serem atualizados
   * @returns {Promise} - Promise com o resultado da atualização
   */
  updateProfile(userData) {
    return ApiService.put('/user/profile', userData);
  },
  
  /**
   * Altera a senha do usuário
   * @param {Object} passwordData - Objeto contendo senha atual e nova senha
   * @returns {Promise} - Promise com o resultado da alteração
   */
  changePassword(passwordData) {
    return ApiService.post('/user/change-password', passwordData);
  }
};

export default UserService;