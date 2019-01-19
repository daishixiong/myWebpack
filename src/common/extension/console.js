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
 * @since 2018-04-17 19:40
 */
'use strict';

function logLine(entries) {
    if (!window.console) {
        return;
    }

    // IE的`console.log`不是函数，不支持`apply`，且不支持多个参数
    if (typeof console.log === 'function') {
        console.log.apply(console, entries);
    }
    else {
        console.log(entries.join(' '));
    }
}

function logWithGroup(groupName) {
    if (!window.console) {
        return;
    }

    if (console.groupCollapsed) {
        console.groupCollapsed(groupName);
        for (let i = 1; i < arguments.length; i++) {
            logLine(arguments[i]);
        }
        console.groupEnd(groupName);
    }
    else {
        console.log('➤' + groupName);
        let prefix = '├───';
        for (let i = 1; i < arguments.length; i++) {
            if (i === arguments.length - 1) {
                prefix = '└───';
            }
            let entry = arguments[i];
            if (typeof entry === 'string') {
                entry = prefix + entry;
            }
            else {
                entry[0] = prefix + entry[0];
            }
            logLine(entry);
        }
    }
}

export default function install(Vue) {
    if (install.installed) return;

    Vue.config.errorHandler = function (err, vm, info) {
        logWithGroup(
            'Vue执行出错了',
            ['出错位置：', info],
            ['出错实例：', vm],
            ['错误内容：', err]
        );
        console.error(err);
    };

    Vue.mixin({
        beforeRouteEnter(to, from, next) {
            next(vm => {
                logWithGroup(
                    '你正在进入："' + to.fullPath + '"',
                    ['页面实例：', vm],
                    ['来源页面：', from]
                );
            });
        },
        beforeRouteLeave(to, from, next) {
            logWithGroup('你正在离开："' + from.fullPath + '"', [
                '前往的URL：',
                to.fullPath
            ]);
            next();
        }
    });
}
