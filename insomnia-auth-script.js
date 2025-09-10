// Script para Insomnia - Pegar Access Token e Setar Environment Variable
// Cole este código na aba "Tests" da sua requisição de autenticação

const data = insomnia.response.json()

// Pega o access token da resposta
const accessToken = data.access_token || data.token || data.accessToken

if (accessToken) {
  // Define a variável de ambiente
  insomnia.environment.set('access_token', accessToken)
  console.log('Access token definido com sucesso!')
} else {
  console.log('Access token não encontrado na resposta')
}
