// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {api} from './config.js';
import '@common/element-ui';
import '../assets/css/element-ui-theme.scss';
import '../assets/css/main.less';
import '../assets/js/vue-ext';

import '@common/extension/vue-utils';
import MyUI from '@common/ui/index';
import VueAxios from '@common/extension/http';
import Console from '@common/extension/console';

// import Permission from '@common/extension/permission';

import BaseLayout from '@common/components/layout/base-layout.vue';

Vue.prototype.$ELEMENT.size = 'small';

Vue.component('BaseLayout', BaseLayout);
Object.defineProperty(Vue.prototype, '$api', {
    get() {
        return api;
    }
});

// Plugins
Vue.use(VueAxios, router);
Vue.use(Console);
// Vue.use(Permission, store);
Vue.use(MyUI, {});
Vue.config.productionTip = process.env.NODE_ENV === 'development';
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});
