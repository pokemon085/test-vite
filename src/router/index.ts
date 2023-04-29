import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'login'
    },
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    meta: {
      title: 'cart'
    },
    component: () => import('@/pages/cart/index.vue')
  },
  {
    path: '/product',
    name: 'product',
    meta: {
      title: 'product'
    },
    component: () => import('@/pages/product/index.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    meta: {
      title: 'contact'
    },
    component: () => import('@/pages/contact/index.vue')
  },
  {
    path: '/catalog',
    name: 'catalog',
    meta: {
      title: 'catalog'
    },

    component: () => import('@/pages/catalog/index.vue')
  },
  {
    path: '/faqs',
    name: 'faqs',
    meta: {
      title: 'faqs'
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

router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});
export default router;
