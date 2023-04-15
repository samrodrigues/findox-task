import { createRouter, createWebHistory } from 'vue-router';
import Deals from '@/views/Deals.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/deals',
    },
    {
      path: '/deals',
      name: 'deals',
      component: Deals,
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import('@/views/Documents.vue'),
    },
  ],
});

export default router;
