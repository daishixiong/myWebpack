/** !
 * Copyright (c) 2017 hillinsight.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"), you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file Title
 * @author lifayu(fyli@hillinsight.com)
 * @since 13/07/2017
 */

import Dialog from './dialog.vue';

function uuid() {
    return 'uuid_' + Date.now() + Math.ceil(Math.random() * 1000);
}

export default {
    create(Vue, store) {
        Vue.prototype.$showDialog = function (Child, extOptions = {}, dialogOptions = {}) {
            const cacheKey = extOptions.cacheKey || uuid();
            if (!this.__dialogCacheQueue__) {
                this.__dialogCacheQueue__ = {};
                this.$options.beforeDestroy = this.$options.beforeDestory || [];
                this.$options.beforeDestroy.push(function () {
                    // destory
                    Object.keys(this.__dialogCacheQueue__).forEach(key => {
                        let vm = this.__dialogCacheQueue__[key];
                        vm.$emit('beforeDestroy');
                        vm.$destroy();
                    });
                });
            }

            let vm = null;
            if (cacheKey && this.__dialogCacheQueue__[cacheKey]) {
                vm = this.__dialogCacheQueue__[cacheKey];
                vm.dialogVisible = true;
            }
            else {
                let NewDialog = Object.create(Dialog);
                NewDialog.components = {
                    UiDialogContent: Child
                };
                NewDialog.store = store;
                NewDialog.propsData = {
                    dialog: dialogOptions,
                    ext: extOptions
                };

                vm = new Vue(NewDialog).$mount();

                vm.$on('beforeDestroy', () => {
                    vm.$el.parentNode.removeChild(vm.$el);
                });
                document.body.appendChild(vm.$el);
                // this.$el.appendChild(vm.$el);
                this.__dialogCacheQueue__[cacheKey] = vm;
            }

            return vm;
        };
    }
};
