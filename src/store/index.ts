import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        bookShelf: [] // 书架信息
    },
    mutations: {
        setBookShelf (state, val) {
            state.bookShelf = val;
        }
    },
    actions: {},
    modules: {}
});
