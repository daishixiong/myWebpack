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
 * @since 2018-03-27 17:21
 */
'use strict';

import Dialog from './dialog/index';
import ListView from './listview/listview.vue';
import SelectTree from './select-tree/select-tree.vue';

import AttrContainer from './attr/attr-container.vue';
import AttrGroup from './attr/attr-group.vue';
import HAttrItem from './attr/attr-item.vue';

function install(Vue, store) {
    if (install.installed) return;
    install.installed = true;

    Dialog.create(Vue, store);

    Vue.component(ListView.name, ListView);
    Vue.component(SelectTree.name, SelectTree);

    Vue.component(AttrContainer.name, AttrContainer);
    Vue.component(AttrGroup.name, AttrGroup);
    Vue.component(HAttrItem.name, HAttrItem);
}

export default install;
