import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../view/Home.vue'
import LayananView from '../view/Layanan.vue'
import NotFoundView from '../view/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/layanan',
      name: 'layanan',
      component: LayananView
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import('../view/Layanan.vue')
    },
    {
      path: '/404',
      component: NotFoundView
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404'
    }
  ]
})

export default router
