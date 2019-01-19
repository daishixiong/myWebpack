/**!
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
 * @since 2018-07-13 14:35
 */
'use strict';
import Vue from 'vue';

Vue.directive('price', {
    update(el, binding, vNode) {
        vNode.context.$nextTick(() => {
            if (vNode.componentInstance.value && !/^\d+(\.\d{0,2}){0,1}$/.test(vNode.componentInstance.value)) {
                let value = vNode.componentInstance.value.match(/^(\d+)(\.\d{1,2}){0,1}/);
                vNode.componentInstance.$emit('input', value ? value[0] : '');
            }
        });
    }
});

Vue.directive('integer', {
    update(el, binding, vNode) {
        vNode.context.$nextTick(() => {
            if (vNode.componentInstance.value && /\D/g.test(vNode.componentInstance.value)) {
                let value = vNode.componentInstance.value.replace(/\D/g, '');
                vNode.componentInstance.$emit('input', value || '');
            }
        });
    }
});

Vue.directive('sprice', {
    update(el, binding, vNode) {
        vNode.context.$nextTick(() => {
            if (vNode.componentInstance.value && !/^\d+(\.\d{0,5}){0,1}$/.test(vNode.componentInstance.value)) {
                let value = vNode.componentInstance.value.match(/^(\d+)(\.\d{1,5}){0,1}/);
                vNode.componentInstance.$emit('input', value ? value[0] : '');
            }
        });
    }
});

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted(el, binding) {
        function findInputAndFocus(nodes = []) {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].tagName === 'INPUT') {
                    nodes[i].focus();
                    return;
                }
                else if (nodes[i].childNodes) {
                    findInputAndFocus(nodes[i].childNodes);
                }
            }
        }
        if (typeof binding.value === 'boolean' && !binding.value) {
            return;
        }
        // 聚焦元素
        if (el.tagName === 'INPUT') {
            el.focus();
        }
        else {
            findInputAndFocus(el.childNodes);
        }
    }
});
