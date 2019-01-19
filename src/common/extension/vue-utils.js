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
 * @file Vue扩展工具类
 *
 * @author lifayu(fyli@hillinsight.com)
 * @since 2017-07-25 16:21
 *
 * @example
 * ```
 * <div v-text="utils.formatNumber(100.23232, 2)"></div>
 * ```
 */

import Vue from 'vue';
import moment from 'moment';
import accounting from 'accounting';

const utils = {};

/**
 * 时间格式化
 *
 * @param {number} value 待处理数据
 * @param {string?} formatter 时间格式
 * @param {string?} defaults 为空时展示的默认值
 *
 * @return string
 */
utils.date = function (value, formatter = 'YYYY-MM-DD HH:mm:ss', defaults = '') {
    if (!value) {
        return defaults;
    }
    let m = moment(value);
    return m.isValid() ? m.format(formatter) : value;
};

/**
 * 默认值
 * @param value
 * @param dft
 * @return {string}
 */
utils.dft = function (value, dft = '') {
    if (typeof value === 'undefined' || value === null || value === '') {
        return dft;
    }
    return value;
};

/**
 * 数字格式化
 *
 * @param {number} number 目标数字
 * @param {number} precision 精度  // 默认为2位
 * @param {string} thousand 千分位
 * @param {string} decimal 小数点
 *
 * @return {string}
 */
utils.formatNumber = function (
    number,
    precision = 2,
    thousand = ',',
    decimal = '.'
) {
    return accounting.formatNumber(number, precision, thousand, decimal);
};

/**
 * 金钱格式化
 * 默认单位是分
 *
 * @return {string}
 */
utils.formatMoney = function (
    number,
    symbol = '￥',
    precision = 2,
    thousand = ',',
    decimal = '.',
    format = '%s%v'
) {
    return accounting.formatMoney(
        number / 100,
        symbol,
        precision,
        thousand,
        decimal,
        format
    );
};

utils.toFixed = function (number, precision = 0) {
    return accounting.toFixed(number, precision).replace(/\.?0+$/g, '');
};

/**
 * 字符串截断
 *
 * @param {string} text 待处理字符串
 * @param {number} length 截取长度
 * @param {string} tail 追加字符串
 *
 * @return string
 */
utils.truncate = function (text, length, tail = '…') {
    if (text.length > length) {
        return text.substr(0, length) + tail;
    }
    return text;
};

utils.escapeHTML = function (html) {
    return html.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
};

utils.unescapeHTML = function (text) {
    return text.replace(/&apos;/, '\'')
        .replace(/&quot;/, '"')
        .replace(/&gt;/, '>')
        .replace(/&lt;/, '<')
        .replace(/&amp;/, '&');
};

/**
 * `\n`替换为`<br>`
 * @param text
 */
utils.nl2br = function (text) {
    return utils.escapeHTML(text).replace(/\n/g, '<br>');
};

for (let fn in utils) {
    if (utils.hasOwnProperty(fn)) {
        Vue.filter(fn, utils[fn]);
    }
}

/**
 * @description 将传入的url参数对象解析组装成字符串做为queryString中的一部分
 * @param {Object} params 请求参数的数组 url的查询部分search
 * @param {string} cgi 请求串 url的路径部分pathname
 * @return {String} queryString部分字符串
 * @example ： param1=value1&param2=value2&param3=value3......
 */
utils.convertParams = function (params, cgi) {
    var paramsArray = [];
    for (var name in params) {
        if (paramsArray.length === 0) {
            cgi && cgi.indexOf('?') !== -1
                ? paramsArray.push('&')
                : paramsArray.push('?');
        }
        else {
            paramsArray.push('&');
        }
        paramsArray.push(name);
        paramsArray.push('=');
        paramsArray.push(params[name]);
    }
    if (cgi) {
        return cgi + paramsArray.join('');
    }
    return paramsArray.join('');
};
/**
 * 深度拷贝
 * @param array object others
 */
utils.deepClone = function (value) {
    if (Array.isArray(value)) {
        return value.map(utils.deepClone);
    }
    else if (value && typeof value === 'object') {
        var res = {};
        for (var key in value) {
            res[key] = utils.deepClone(value[key]);
        }
        return res;
    }
    else {
        return value;
    }
};

/**
 * 将utils绑定到Vue上
 *
 * @type {Object}
 */
Vue.prototype.utils = utils;

export default utils;
