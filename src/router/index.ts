import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: () => import('../views/PostView.vue'),
    },
    {
      path: '/posts/:id/edit',
      name: 'post-edit',
      component: () => import('../views/PostEdit.vue'),
    },
  ],
})

export default router
