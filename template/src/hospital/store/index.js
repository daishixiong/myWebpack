'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);
const DEBUG = process.env.NODE_ENV !== 'production';

const state = {
    // 连锁Id
    chainId: null
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    strict: DEBUG,
    plugins: [createLogger()]
});
