import { defineStore } from 'pinia';
import { UserService } from '@/services/user.service';
import type { User } from '@/types/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isLoggedIn: (state) => state.user !== null,
    userName: (state) => state.user?.name || '',
    userEmail: (state) => state.user?.email || '',
  },

  actions: {
    async loadUserProfile() {
      this.loading = true;
      this.error = null;

      try {
        const userData = await UserService.getUserProfile();
        this.user = userData;
      } catch (error) {
        this.error = 'Erro ao carregar perfil do usuário';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    clearUser() {
      this.user = null;
      this.error = null;
    },

    clearError() {
      this.error = null;
    },
  },
});