/**
 * Extrai a extensão de um nome de arquivo
 * @param {string} filename - Nome do arquivo
 * @returns {string} - Extensão do arquivo em minúsculas ou string vazia se não houver extensão
 */
export const getFileExtension = (filename) => {
  if (!filename) return '';
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
};

/**
 * Calcula a probabilidade em porcentagem
 * @param {number} probability - Probabilidade em decimal (0-1)
 * @returns {number} - Probabilidade em porcentagem (0-100)
 */
export const calculateProbabilityPercentage = (probability) => {
  return Math.floor(probability * 100);
};

/**
 * Processa um arquivo adicionando extensão e calculando probabilidade
 * @param {Object} file - Objeto do arquivo
 * @returns {Object} - Arquivo processado com extensão e probabilidade
 */
export const processFile = (file) => {
  return {
    ...file,
    extension: getFileExtension(file.name),
    probability: calculateProbabilityPercentage(file.probability)
  };
};