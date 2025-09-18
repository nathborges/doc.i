import { defineStore } from 'pinia';
import { router } from '@/router';
import { AuthService } from '@/services/auth.service';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: localStorage.getItem('user'),
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    returnUrl: null,
  }),
  getters: {
    isLoggedIn: (state) => state.isAuthenticated && !!localStorage.getItem('token'),
  },
  actions: {
    async login(email: string, password: string) {
      const response = await AuthService.login(email, password);
      this.user = email;
      this.isAuthenticated = true;
      router.push(this.returnUrl || '/');
      return response;
    },
    logout() {
      AuthService.logout();
      this.user = null;
      this.isAuthenticated = false;
      router.push('/login1');
    },
    async checkAuth() {
      const isValid = await AuthService.checkAuth();
      this.isAuthenticated = isValid;
      if (!isValid) {
        this.user = null;
      }
      return isValid;
    },

    initializeAuth() {
      const token = localStorage.getItem('token');
      const isAuth = localStorage.getItem('isAuthenticated') === 'true';
      const user = localStorage.getItem('user');

      if (token && isAuth && user) {
        this.user = user;
        this.isAuthenticated = true;
        AuthService.setAuthHeader(token);
      } else {
        this.logout();
      }
    },
  },
});
