<template>
    <div class="v-base-not_found">
        <div class="container">
            <h1>404</h1>
            <blockquote>您当前访问的页面不存在</blockquote>
            <router-link to="/">返回首页</router-link>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
.container {
    width: 600px;
    margin: 30px auto;
    blockquote {
        color: #666;
        border-left: 3px solid #ddd;
        margin: 20px 0;
        padding-left: 10px;
    }
}
</style>
<script>
/**!
 * Copyright (c) 2017 hillinsight.com, Inc. All Rights Reserved
 *
 * @author lifayu(fyli@hillinsight.com)
 * @since 2018-06-11 10:46
 */
'use strict';
export default {
    data() {
        return {};
    }
};
</script>
