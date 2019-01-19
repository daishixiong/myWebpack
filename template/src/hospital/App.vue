<template>
    <div id="app" style="min-width: 1280px;">
        <router-view v-if="inited"></router-view>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>

</style>
<script>
/**!
 * Copyright (c) 2017 hillinsight.com, Inc. All Rights Reserved
 *
 * @author lifayu(fyli@hillinsight.com)
 * @since 2018-12-06 19:35
 * @corporation 瓴域集团
 * @version 0.1.0
 */
'use strict';
// import Vue from 'vue';
// import permission from '@common/extension/permission2';

export default {
    name: 'App',
    data() {
        return {
            inited: false
            // inited: true
        };
    },
    created() {
        setTimeout(_ => {
            this.inited = true;
        }, 1000);
        // 获取权限
        // this.getPrivilege().then(({operation, resource}) => {
        //     Vue.use(permission, permission.fixPrivilege(operation, resource = null));
        //     this.inited = true;
        // });
    },
    methods: {
        // getPrivilege() {
        //     return this.$http.post(this.$api.getPrivList).then(res => {
        //         return res.data;
        //     });
        // }
    }
};
</script>
