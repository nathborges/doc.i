// src/store/viewState.js
import { ref } from 'vue';

export const currentView = ref('home');
export const currentCategory = ref(null);

export function changeView(viewName, category = null) {
  currentView.value = viewName;
  if (category) {
    currentCategory.value = category;
  }
}
