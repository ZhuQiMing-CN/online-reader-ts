import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/app.scss';
import axios from 'axios';

Vue.use(ElementUI);

// 全局的 axios 默认值
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
let loading: any;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 显示loading
    loading = Vue.prototype.$loading({
        lock: true,
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    loading && loading.close();
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
