import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import PublicRoutes from './PublicRoutes';
import { useAuthStore } from '@/stores/auth';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue'),
    },
    MainRoutes,
    PublicRoutes,
  ],
});

interface User {
  // Define the properties and their types for the user data here
  // For example:
  id: number;
  name: string;
}

// Assuming you have a type/interface for your authentication store
interface AuthStore {
  user: string | null;
  returnUrl: string | null;
  isAuthenticated: boolean;
  login(username: string, password: string): Promise<void>;
  logout(): void;
  checkAuth(): Promise<boolean>;
}

// router.beforeEach(async (to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/'];
//   const auth: AuthStore = useAuthStore();

//   const isPublicPage = publicPages.includes(to.path);
//   const authRequired = !isPublicPage && to.matched.some((record) => record.meta.requiresAuth);
//   const isAuthenticated = await auth.checkAuth();

//   if (authRequired && !auth.isAuthenticated) {
//     auth.returnUrl = to.fullPath; // Save the intended page
//     next('/login');
//   } else if (auth.user && to.path === '/login') {
//     // User logged in and trying to access the login page
//     next({
//       query: {
//         ...to.query,
//         redirect: auth.returnUrl !== '/' ? to.fullPath : undefined,
//       },
//     });
//   } else {
//     next();
//   }
// });

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/'];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem('token');

  if (authRequired && !token) {
    next('/login');
  } else {
    next();
  }
});
