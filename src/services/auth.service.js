// Simulação de um token JWT
const generateToken = () => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';
}

// Usuários de exemplo para simulação
const users = [
  {
    id: 1,
    username: 'usuario',
    email: 'usuario@exemplo.com',
    password: 'senha123',
    name: 'Usuário Teste'
  }
];

/**
 * Serviço de autenticação
 */
export const AuthService = {
  /**
   * Realiza o login do usuário
   * @param {string} username - Nome de usuário ou email
   * @param {string} password - Senha do usuário
   * @returns {Promise} - Promise com o resultado do login
   */
  login(username, password) {
    return new Promise((resolve, reject) => {
      // Simulando uma chamada de API com um pequeno delay
      setTimeout(() => {
        const user = users.find(
          u => (u.username === username || u.email === username) && u.password === password
        );
        
        if (user) {
          // Cria um objeto de usuário sem a senha
          const { password, ...userWithoutPassword } = user;
          
          // Gera um token de autenticação
          const token = generateToken();
          
          // Armazena os dados no localStorage
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          localStorage.setItem('token', token);
          
          resolve({
            user: userWithoutPassword,
            token
          });
        } else {
          reject({ message: 'Nome de usuário ou senha incorretos' });
        }
      }, 800);
    });
  },
  
  /**
   * Registra um novo usuário
   * @param {Object} userData - Dados do usuário
   * @returns {Promise} - Promise com o resultado do registro
   */
  register(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verifica se o usuário já existe
        const userExists = users.some(
          u => u.username === userData.username || u.email === userData.email
        );
        
        if (userExists) {
          reject({ message: 'Usuário ou email já cadastrado' });
          return;
        }
        
        // Cria um novo usuário
        const newUser = {
          id: users.length + 1,
          ...userData
        };
        
        // Adiciona o usuário à lista (em um cenário real, seria salvo no banco de dados)
        users.push(newUser);
        
        // Retorna o usuário sem a senha
        const { password, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword);
      }, 800);
    });
  },
  
  /**
   * Realiza o logout do usuário
   */
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
  
  /**
   * Verifica se o usuário está autenticado
   * @returns {boolean} - True se o usuário estiver autenticado
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },
  
  /**
   * Obtém o usuário atual
   * @returns {Object|null} - Objeto do usuário ou null se não estiver autenticado
   */
  getCurrentUser() {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  },
  
  /**
   * Obtém o token de autenticação
   * @returns {string|null} - Token de autenticação ou null se não estiver autenticado
   */
  getToken() {
    return localStorage.getItem('token');
  }
};

export default AuthService;