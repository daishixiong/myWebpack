<template>
    <div class="h-attr-group">
        <div class="h-attr-group-title">
            <slot name="title">{{title}}</slot>
        </div>
        <div class="h-attr-group-content">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
@import '../../css/variable';
.h-attr-group {
    &-title {
        height: 30px;
        line-height: 30px;
        padding-left: 8px;
        position: relative;
        font-size: 14px;
        &:before {
            content: '';
            position: absolute;
            height: 14px;
            top: 8px;
            left: 0;
            width: 2px;
            border-radius: 2px;
            background: @group-block-color;
        }
    }
    &-content {
        padding: 10px 0 20px;
    }
}
</style>
<script>
/**!
 * Copyright (c) 2017 hillinsight.com, Inc. All Rights Reserved
 *
 * @author lifayu(fyli@hillinsight.com)
 * @since 2018-05-26 17:12
 */
'use strict';
export default {
    name: 'HAttrGroup',
    props: {
        title: {
            type: String
        }
    },
    data() {
        return {};
    }
};
</script>
