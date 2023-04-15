import { createRouter, createWebHistory } from 'vue-router'
import Deals from '@/views/Deals.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/deals',
      name: 'deals',
      component: Deals
    },
    {
      path: '/about',
      name: 'documents',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Documents.vue')
    }
  ]
})

export default router
