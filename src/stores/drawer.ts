import { defineStore } from 'pinia';

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    Sidebar_drawer: window.innerWidth >= 1024,
    iaDrawerIsOpen: false,
    inputBg: false,
  }),

  actions: {
    SET_SIDEBAR_DRAWER() {
      this.Sidebar_drawer = !this.Sidebar_drawer;
    },

    SET_IA_DRAWER(payload: boolean) {
      this.iaDrawerIsOpen = payload;
    },

    SET_INPUT_BG(payload: boolean) {
      this.inputBg = payload;
    },
  },
});
