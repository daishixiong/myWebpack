<template>
    <div class="h-attr-item">
        <div class="h-attr-item-label" :style="{width: parentAttr.labelWidth, textAlign: parentAttr.labelAlign}">
            <slot name="label">{{label}}</slot>
        </div>
        <div class="h-attr-item-content"><slot></slot></div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
@import '../../css/variable';
.h-attr-item {
    display: flex;
    line-height: 1.2;
    padding: 8px 0;
    &-label {
        color: @label-gray-color;
        flex-shrink: 0;
    }
    &-content {
        flex: 1;
        padding: 0 16px;
        hyphens: auto;
    }
}
</style>
<script>
/**!
 * Copyright (c) 2017 hillinsight.com, Inc. All Rights Reserved
 *
 * @author lifayu(fyli@hillinsight.com)
 * @since 2018-05-17 13:25
 */
'use strict';
export default {
    name: 'HAttrItem',
    componentName: 'HAttrItem',
    props: {
        label: {
            type: String
        }
    },
    data() {
        return {};
    },
    computed: {
        parentAttr() {
            let attr = {
                labelWidth: '100px',
                labelAlign: 'left'
            };
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.componentName === 'HAttrContainer') {
                    attr.labelWidth = parent.labelWidth;
                    attr.labelAlign = parent.labelAlign;
                    break;
                }
                parent = parent.$parent;
            }
            return attr;
        }
    }
};
</script>
