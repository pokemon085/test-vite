import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/login',
  //   name: 'Login',
  //   meta: {
  //     title: '登录',
  //     keepAlive: true,
  //     requireAuth: false
  //   },
  //   component: () => import('@/pages/login.vue')
  // },
  {
    path: '/product',
    name: 'product',
    meta: {
      title: 'product',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/pages/product/index.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    meta: {
      title: 'blog',
      keepAlive: true,
      requireAuth: false
    },
    component: () => import('@/pages/blog/index.vue')
  },
  {
    path: '/catalog',
    name: 'catalog',
    meta: {
      title: 'catalog',
      keepAlive: true,
      requireAuth: false
    },

    component: () => import('@/pages/catalog/index.vue')
  },
  {
    path: '/faqs',
    name: 'faqs',
    meta: {
      title: 'faqs',
      keepAlive: true,
      requireAuth: false
    },
    component: () => import('@/pages/faqs/index.vue')
  },
  {
    path: '/',
    name: 'Index',
    meta: {
      title: 'home',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/pages/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;
