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
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
