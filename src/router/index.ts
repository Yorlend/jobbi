import Day from '@/views/Day.vue'
import Month from '@/views/Month.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/day' },
    { path: '/day', name: 'day', component: Day },
    { path: '/month', name: 'month', component: Month },
  ],
})

export default router
