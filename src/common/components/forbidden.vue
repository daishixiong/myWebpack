<template>
    <div class="v-base-forbidden">
        <div class="container">
            <h1>403</h1>
            <blockquote>权限不足，请联系管理员添加。</blockquote>
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
