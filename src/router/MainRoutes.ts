const MainRoutes = {
  path: '/',
  meta: {
    requiresAuth: true,
  },
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'LandingPage',
      path: '',
      component: () => import('@/views/dashboards/default/DefaultDashboard.vue'),
    },
    {
      name: 'Default',
      path: '/dashboard/default',
      component: () => import('@/views/dashboards/default/DefaultDashboard.vue'),
    },
    {
      name: 'Category',
      path: '/category/:id',
      component: () => import('@/views/category/CategoryPage.vue'),
    },
  ],
};

export default MainRoutes;
