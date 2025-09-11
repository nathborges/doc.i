export const useToast = () => {
  const showToast = (message, type = 'info', duration = 3000) => {
    if (window.showToast) {
      window.showToast(message, type, duration)
    }
  }

  return { showToast }
}
