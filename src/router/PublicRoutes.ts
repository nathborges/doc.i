const PublicRoutes = {
  path: '/',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false,
  },
  children: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/authentication/LoginPage.vue'),
    },
    {
      name: 'Register',
      path: '/register',
      component: () => import('@/views/authentication/auth/RegisterPage.vue'),
    },
    {
      name: 'Error 404',
      path: '/error',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue'),
    },
  ],
};

export default PublicRoutes;
