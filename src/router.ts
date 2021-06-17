import * as VueRouter from 'vue-router'
import { ref, nextTick } from 'vue'

export const routes: VueRouter.RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('./views/home.vue'),
  },
  {
    name: 'article',
    path: '/article/:category/:slug',
    component: () => import('./views/article.vue'),
  },
  {
    name: 'page',
    path: '/page/:slug',
    component: () => import('./views/page.vue'),
  },
]

// @ts-ignore
if (import.meta.env.MODE === 'development') {
  routes.push({
    name: 'components',
    path: '/components',
    component: () => import('./views/components.vue'),
    meta: {
      layout: 'unset',
    },
  })
}

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})

export const routeViewKey = ref(Math.random().toString())
export const reloadRouteView = () => {
  routeViewKey.value = Math.random().toString()
}
