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
 * @since 2018-03-28 13:05
 */

'use strict';

function install(Vue, store) {
    if (install.installed) {
        return;
    }
    install.installed = true;

    Object.defineProperty(Vue.prototype, '$allow', {
        get() {
            return store.state.funcPrivilegeMap;
        }
    });

    Vue.mixin({
        created() {
            const privilege = this.$options.privilege;
            let ret = true;
            if (typeof privilege === 'function') {
                ret = privilege.call(this, store.state.funcPrivilegeMap);
            }
            else if (typeof privilege === 'string') {
                ret = this.$allow[privilege];
            }
            if (!ret) {
                this.$router.replace('/403');
            }
        }
    });
}

export default install;
