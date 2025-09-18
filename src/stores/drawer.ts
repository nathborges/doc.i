import { defineStore } from 'pinia';

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    Sidebar_drawer: true,
    Customizer_drawer: false,
    iaDrawerIsOpen: false,
    fontTheme: 'Inter',
    inputBg: false,
  }),

  actions: {
    SET_SIDEBAR_DRAWER() {
      this.Sidebar_drawer = !this.Sidebar_drawer;
    },

    SET_CUSTOMIZER_DRAWER(payload: boolean) {
      this.Customizer_drawer = payload;
    },

    SET_IA_DRAWER(payload: boolean) {
      console.log('oioi', payload);
      this.iaDrawerIsOpen = payload;
    },

    SET_FONT(payload: string) {
      this.fontTheme = payload;
    },

    SET_INPUT_BG(payload: boolean) {
      this.inputBg = payload;
    },
  },
});
