import axios from 'axios';

// 全局的 axios 默认值
axios.defaults.timeout = 30000;
// axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 获取分类下小类别
export const Categorylist = () => {
    return axios.get('/api/cats/lv2').then(res => res.data);
};
// 根据分类获取小说列表
export const Categorylistbook = (params: any) => {
    return axios.get('/api/book/by-categories', {params: params}).then(res => res.data);
};


// 搜索自动补充
export const Searchauto = (params: any) => {
    return axios.get('/api/book/auto-complete', {params: params}).then(res => res.data);
};
// 模糊搜索
export const Searchfuzzy = (params: any) => {
    return axios.get('/api/book/fuzzy-search', {params: params}).then(res => res.data);
};
// 获取搜索热词
export const Searchhotwords = () => {
    return axios.get('/api/book/search-hotwords').then(res => res.data);
};
