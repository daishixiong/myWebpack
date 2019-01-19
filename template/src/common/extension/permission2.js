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
 * @file 权限判定模块
 * @usage
 *  注册权限
 *  Vue.use(permission, permission.fixPrivilege(operation, resource = null));
 *  Vue.use(permission, {action: {struct: [1, 2], chain: [1, 2]}}, true); // 多中资源混合权限
 *  使用权限
 *  <el-button v-if="hasPrivilege('actionCode', 1)">button</button>
 *  <el-button v-if="hasPrivilege('actionCode', 'chain', 1)">button</button> // 多中资源混合权限
 * @author lifayu(fyli@hillinsight.com)
 * @since 2018-03-28 13:05
 */

'use strict';

function install(Vue, privilege, multiple = false) {
    if (install.installed) {
        return;
    }
    install.installed = true;

    Object.defineProperty(Vue.prototype, '$allow', {
        get() {
            return privilege;
        }
    });

    Object.defineProperty(Vue.prototype, 'hasPrivilege', {
        get() {
            return function (action, type, value) {
                if (multiple) {
                    if (typeof type !== 'undefined') {
                        if (typeof value !== 'undefined') {
                            return privilege[action] && privilege[action][type] && privilege[action][type].indexOf(value) !== -1;
                        }
                        return privilege[action] && privilege[action][type] && privilege[action][type].length > 0;
                    }
                }
                else {
                    if (typeof type !== 'undefined') {
                        return privilege[action] && privilege[action].indexOf(type) !== -1;
                    }
                }
                return privilege[action];
            };
        }
    });
}

install.fixPrivilege = function (operation, resource) {
    let map = {};
    Object.keys(operation).forEach(key => {
        let role = operation[key];
        map[key] = resource ? resource[role] : true;
    });
    return map;
};

export default install;
