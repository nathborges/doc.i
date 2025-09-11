import { createRouter, createWebHistory } from 'vue-router'
import { AuthService } from '@/services/auth.service'
import HomeView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/categoria/:name/:id',
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
    path: '/favorites',
    name: 'favorites',
    redirect: '/'
  },
  {
    path: '/shared',
    name: 'shared',
    redirect: '/'
  },
  {
    path: '/trash',
    name: 'trash',
    redirect: '/'
  },
  {
    path: '/recent',
    name: 'recent',
    redirect: '/'
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/profile',
    name: 'profile',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/unauthorized',
    redirect: '/login'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
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
