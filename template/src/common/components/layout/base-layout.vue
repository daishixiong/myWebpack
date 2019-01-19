<template>
    <el-container class="v-base-layout">
        <el-aside v-if="$slots.aside">
            <slot name="aside"></slot>
        </el-aside>
        <el-main>
            <slot></slot>
        </el-main>
        <el-footer v-if="$slots.footer">
            <slot name="footer"></slot>
        </el-footer>
    </el-container>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
/**!
 * Copyright (c) 2017 hillinsight.com, Inc. All Rights Reserved
 *
 * @author lifayu(fyli@hillinsight.com)
 * @since 2018-05-07 14:57
 */
'use strict';
export default {
    data() {
        return {};
    }
};
</script>
