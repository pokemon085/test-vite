import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'login',
        },
        component: () => import('@/pages/login/index.vue'),
    },
    {
        path: '/news',
        name: 'news',
        meta: {
            title: 'news',
        },
        component: () => import('@/pages/news/index.vue'),
    },
    {
        path: '/cart',
        name: 'cart',
        meta: {
            title: 'cart',
        },
        component: () => import('@/pages/cart/index.vue'),
    },
    {
        path: '/product',
        name: 'product',
        meta: {
            title: 'product',
        },
        component: () => import('@/pages/product/index.vue'),
    },
    {
        path: '/contact',
        name: 'Contact',
        meta: {
            title: 'contact',
        },
        component: () => import('@/pages/contact/index.vue'),
    },
    {
        path: '/catalog',
        name: 'catalog',
        meta: {
            title: 'catalog',
        },

        component: () => import('@/pages/catalog/index.vue'),
    },
    {
        path: '/faqs',
        name: 'faqs',
        meta: {
            title: 'faqs',
        },
        component: () => import('@/pages/faqs/index.vue'),
    },
    {
        path: '/buyHistory',
        name: 'buyHistory',
        meta: {
            title: 'buyHistory',
        },
        component: () => import('@/pages/buyHistory/index.vue'),
    },
    {
        path: '/',
        name: 'Index',
        meta: {
            title: 'home',
            keepAlive: true,
            requireAuth: true,
        },
        component: () => import('@/pages/index.vue'),
    },
];

// createWebHistory 改成 createWebHashHistory 因為 GitHub Pages 只知道靜態檔案，找不到 History 路由對應的檔案
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
export default router;
