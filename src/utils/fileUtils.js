/**
 * Extrai a extensão de um nome de arquivo
 * @param {string} filename - Nome do arquivo
 * @returns {string} - Extensão do arquivo em minúsculas ou string vazia se não houver extensão
 */
export const getFileExtension = filename => {
  if (!filename) return ''
  const parts = filename.split('.')
  return parts.length > 1 ? parts.pop().toLowerCase() : ''
}

/**
 * Calcula a probabilidade em porcentagem
 * @param {number} probability - Probabilidade em decimal (0-1)
 * @returns {number} - Probabilidade em porcentagem (0-100)
 */
export const calculateProbabilityPercentage = probability => {
  return Math.floor(probability * 100)
}

/**
 * Processa um arquivo adicionando extensão e calculando probabilidade
 * @param {Object} file - Objeto do arquivo
 * @returns {Object} - Arquivo processado com extensão e probabilidade
 */
export const processFile = file => {
  return {
    ...file,
    extension: getFileExtension(file.filename),
    probability: calculateProbabilityPercentage(file.probability),
    filename: getFileNameFromUrl(file.url)
  }
}

/**
 * Filtra arquivos com probabilidade maior ou igual a 80%
 * @param {Array} files - Lista de arquivos
 * @returns {Array} - Lista filtrada de arquivos
 */
export const filterHighProbabilityFiles = files => {
  return files.filter(file => file.probability >= 83)
}

/**
 * Extrai o nome do arquivo de uma URL, removendo o ID único entre _ e .extensão
 * @param {string} url - URL do arquivo
 * @returns {string} - Nome do arquivo limpo, sem o ID único
 */
export const getFileNameFromUrl = url => {
  if (!url) return ''
  const segments = url.split('/')
  const fileName = segments[segments.length - 1] || ''
  return fileName.replace(/_[^_.]+(\.[^.]+)$/, '$1')
}
