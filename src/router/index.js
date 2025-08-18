import { createRouter, createWebHistory } from 'vue-router'
import { AuthService } from '@/services/auth.service'
import HomeView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/categoria/:name',
    name: 'category',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/unauthorized',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !AuthService.checkAuth()) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
