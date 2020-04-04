import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from '@/components/MainView.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/index',
        component: MainView,
        children: [
            { path: '/', name: 'index', component: () => import('@/views/index.vue') }
        ]
    },
    {
        path: '/category',
        component: MainView,
        children: [
            {
                path: '/',
                name: 'category',
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
        path: '/ranking',
        component: MainView,
        children: [
            {
                path: '/',
                name: 'ranking',
                component: () => import('@/views/ranking/Ranking.vue'),
                redirect: 'rmale',
                children: [
                    { path: 'rmale', component: () => import('@/views/ranking/male/rmale.vue') },
                    { path: 'rfemale', component: () => import('@/views/ranking/female/rfemale.vue') },
                    { path: 'rpress', component: () => import('@/views/ranking/press/rpress.vue') },
                    { path: 'rpicture', component: () => import('@/views/ranking/picture/rpicture.vue') }
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
    },
    {
        path: '/bookshelf',
        component: MainView,
        children: [
            { path: '/', name: 'bookshelf', component: () => import('@/views/bookshelf/bookshelf.vue') }
        ]
    },
    {
        path: '/search',
        component: MainView,
        children: [
            { path: '/', name: 'search', component: () => import('@/views/search/search.vue') }
        ]
    },
    {
        path: '*',
        redirect: '/index'
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
