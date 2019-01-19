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
 * @file Axios 个性化定制
 * @author lifayu(fyli@hillinsight.com)
 * @since 2018-04-04 15:37
 */
'use strict';

import axios from 'axios';
import { Message, Loading } from 'element-ui';

const instance = axios.create();
let fullscreenLoading = null;
let cancelSource;

// 当前有效的Ajax请求数
let active = 0;

function showLoading(scene, isAjax = true) {
    setTimeout(() => {
        if (isAjax && active === 0) {
            return;
        }
        fullscreenLoading = Loading.service({
            fullscreen: true
        });
    }, 80);
}
function hideLoading(isAjax = true) {
    isAjax && active--;
    setTimeout(() => {
        if (active === 0) {
            fullscreenLoading.close();
        }
    }, 100);
}
function logWithGroup([groupName, style]) {
    if (!window.console) {
        return;
    }
    if (console.groupCollapsed) {
        console.groupCollapsed(groupName, ...style);
        for (let i = 1; i < arguments.length; i++) {
            console.log(...arguments[i]);
        }
        console.groupEnd();
    }
}

instance.defaults.timeout = 16000;
instance.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

instance.interceptors.request.use(
    config => {
        // 支持rest方式的url地址
        if (config.rest) {
            config.url = config.url.replace(/:([^/]+)/g, function (a, b) {
                let param = config.rest[b];
                delete config.rest[b];
                return param;
            });
            console.log('config', config.rest);
        }
        logWithGroup(
            [
                `%c[发送请求]%c[${config.method.toUpperCase()}] %c${
                    config.url
                }`,
                [
                    'color: blue;',
                    'color: #ab7100;',
                    'color: gray; font-weight: 400;'
                ]
            ],
            [config]
        );
        if (!config.local) {
            // Loading
            showLoading('[Ajax]' + config.url);
        }
        if (cancelSource) {
            config.cancelToken = cancelSource.token;
        }

        active++;

        return config;
    },
    err => {
        hideLoading();
        Message.error({
            message: '发送网络请求失败'
        });
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    res => {
        logWithGroup(
            [
                `%c[请求响应] %c${res.config.url}`,
                ['color: green;', 'color: gray; font-weight: 400;']
            ],
            ['数据', res.data],
            ['XMLHttpRequest', res.request],
            ['Headers', res.headers],
            ['配置信息', res.config]
        );

        hideLoading();
        const json = res.data;
        return new Promise((resolve, reject) => {
            if (json.success || json.code === 0) {
                resolve({
                    config: res.config,
                    headers: res.headers,
                    status: res.status,
                    request: res.request,
                    originData: res.data,
                    data: json.data || json.result
                });
            }
            else {
                Message.error({
                    message: json.message || json.msg || '操作出错了'
                });
                const error = new Error(json.message || json.msg);
                error.config = res.config;
                error.request = res.request;
                error.response = res;
                reject(error);
            }
        });
    },
    err => {
        hideLoading();
        if (!axios.isCancel(err)) {
            const res = err.response;
            if (res && res.status === 401) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                const url = data.url || (data.data ? data.data.url : data.result.url);
                // 需要登录
                if (url) {
                    window.location.href = url;
                }
                else {
                    Message.error({
                        message: '登录失效'
                    });
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 1000);
                }
            }
            else {
                logWithGroup(
                    [
                        `%c[请求失败] %c${res.config.url}`,
                        ['color: red;', 'color: gray; font-weight: 400;']
                    ],
                    ['数据', res.data],
                    ['Headers', res.headers],
                    ['XMLHttpRequest', res.request],
                    ['配置信息', res.config]
                );
                Message.error({
                    message: err.message || '获取数据失败，请稍后重试！'
                });
            }
        }
        return Promise.reject(err);
    }
);

function install(Vue, router) {
    if (install.installed) {
        return;
    }
    install.installed = true;

    if (router) {
        router.beforeEach(function (to, from, next) {
            if (cancelSource) {
                cancelSource.cancel('页面离开，取消请求');
            }
            cancelSource = axios.CancelToken.source();
            showLoading('router before', false);
            next();
        });
        router.afterEach(route => {
            hideLoading(false);
        });
    }

    Object.defineProperties(Vue.prototype, {
        $http: {
            get() {
                return instance;
            }
        }
    });
}

export const http = instance;

export default install;
