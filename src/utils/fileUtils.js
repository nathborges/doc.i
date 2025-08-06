/**
 * Extracts the extension from a filename
 * @param {string} filename - File name
 * @returns {string} - File extension in lowercase or empty string if none
 */
export const getFileExtension = (filename) => {
  if (!filename) return '';
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
};

/**
 * Calculates probability percentage
 * @param {number} probability - Probability in decimal (0-1)
 * @returns {number} - Probability in percentage (0-100)
 */
export const calculateProbabilityPercentage = (probability) => {
  return Math.floor(probability * 100);
};

/**
 * Processes a file by adding extension and calculating probability
 * @param {Object} file - File object
 * @returns {Object} - Processed file with extension and probability
 */
export const processFile = (file) => {
  return {
    ...file,
    extension: getFileExtension(file.filename),
    probability: calculateProbabilityPercentage(file.probability),
    filename: getFileNameFromUrl(file.url)
  };
};

/**
 * Filters files with probability greater than or equal to 80%
 * @param {Array} files - List of files
 * @returns {Array} - Filtered list of files
 */
export const filterHighProbabilityFiles = (files) => {
  return files.filter(file => file.probability >= 80);
};

/**
 * Extracts the filename from a URL, removing the unique ID between _ and .extension
 * @param {string} url - File URL
 * @returns {string} - Clean filename without unique ID
 */
export const getFileNameFromUrl = (url) => {
  if (!url) return '';
  const segments = url.split('/');
  const fileName = segments[segments.length - 1] || '';
  return fileName.replace(/_[^_.]+(\.[^.]+)$/, '$1');
};