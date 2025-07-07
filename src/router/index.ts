import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ThirdView from '@/views/ThirdView.vue'
import QueensPuzzle from '@/components/QueensPuzzle.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '康健作業',
      component: ThirdView
    },
    {
      path: '/third',
      name: '新北男女分佈',
      component: HomeView
    },
    {
      path: '/test8Queens',
      name: 'test8Queens',
      component: QueensPuzzle
    }
  ]
})

export default router
