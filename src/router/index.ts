import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from '@/components/MainView.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/about',
        name: 'About',
        component: MainView,
        children: [
            { path: '/', component: () => import('@/views/About.vue') }
        ]
    },
    {
        path: '/category',
        name: 'category',
        component: MainView,
        children: [
            {
                path: '/',
                component: () => import('@/views/category/Category.vue'),
                redirect: 'male',
                children: [
                    { path: 'male', component: () => import('@/views/category/male/male.vue') },
                    { path: 'female', component: () => import('@/views/category/female/female.vue') },
                    { path: 'press', component: () => import('@/views/category/press/press.vue') },
                    { path: 'picture', component: () => import('@/views/category/picture/picture.vue') }
                ]
            }
        ]
    },
    {
        path: '/bookinfo',
        name: 'bookinfo',
        component: MainView,
        children: [
            { path: ':bookId', component: () => import('@/views/bookinfo/bookinfo.vue') }
        ]
    },
    {
        path: '/bookchapter',
        name: 'bookchapter',
        component: MainView,
        children: [
            { path: ':bookId', component: () => import('@/views/bookchapter/bookchapter.vue') }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
