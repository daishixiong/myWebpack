<template>
    <div class="h-attr-container">
        <slot></slot>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
.h-attr-container {
    display: flex;
    flex-shrink: 1;
    flex-wrap: wrap;
}
</style>
<script>
/**!
 * Copyright (c) 2017 hillinsight.com, Inc. All Rights Reserved
 *
 * @author lifayu(fyli@hillinsight.com)
 * @since 2018-05-17 13:24
 */
'use strict';
export default {
    name: 'HAttrContainer',
    componentName: 'HAttrContainer',
    props: {
        labelWidth: {
            type: String,
            default: '100px'
        },
        labelAlign: {
            type: String,
            default: 'left'
        }
    },
    data() {
        return {};
    }
};
</script>
