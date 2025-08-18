import { ref, reactive, computed } from 'vue'

const globalState = reactive({
  user: null,
  isAuthenticated: false,
  notifications: [],
  loading: {
    auth: false,
    files: false,
    search: false
  }
})

export const useGlobalState = () => {
  const isLoading = computed(() => 
    Object.values(globalState.loading).some(loading => loading)
  )

  const setUser = (user) => {
    globalState.user = user
    globalState.isAuthenticated = !!user
  }

  const setLoading = (key, value) => {
    if (key in globalState.loading) {
      globalState.loading[key] = value
    }
  }

  const addNotification = (notification) => {
    const id = Date.now()
    globalState.notifications.push({ ...notification, id })
    
    if (notification.autoClose !== false) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }

  const removeNotification = (id) => {
    const index = globalState.notifications.findIndex(n => n.id === id)
    if (index > -1) {
      globalState.notifications.splice(index, 1)
    }
  }

  const clearNotifications = () => {
    globalState.notifications = []
  }

  return {
    ...globalState,
    isLoading,
    setUser,
    setLoading,
    addNotification,
    removeNotification,
    clearNotifications
  }
}