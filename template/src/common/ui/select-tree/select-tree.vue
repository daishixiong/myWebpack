<template>
    <el-popover
        ref="popover"
        class="h-select-tree"
        placement="bottom-start"
        popper-class="h-select-tree-popover"
        :style="treeStyle"
        @show="handlePopoverShow"
        @hide="handlePopoverHide"
        :width="calcPopoverWidth"
        trigger="click">
        <el-input class="h-select-tree-search"
                  placeholder="请输入关键字搜索"
                  ref="input"
                  prefix-icon="el-icon-search" v-model="filterText"></el-input>
        <div class="h-select-tree-view scroll-body" :class="{'autoheight': autoHeight}">
            <el-tree :data="datasource"
                     ref="tree"
                     :props="defaultProps"
                     :expand-on-click-node="onlyLeaf"
                     :highlight-current="!multiple"
                     :default-expanded-keys="expandedKeys"
                     :node-key="defaultProps.value"
                     :filter-node-method="filterNode"
                     @node-click="handleNodeClick">
                <span class="custom-tree-node" :class="{'is-disabled': data.disabled}" slot-scope="{ node, data }">
                    <span style="flex: 1; white-space: nowrap;">
                        {{ node.label }}
                        <i class="el-icon-check" style="color: #67C23A;"
                           v-if="node.checked && ((onlyLeaf && node.isLeaf) || !onlyLeaf)"></i>
                    </span>
                    <a v-if="multiple && !node.isLeaf && onlyLeaf && !filterText"
                       href="javascript:void(0)"
                       @click.stop="checkAll(data, node)">全选</a>
                </span>
            </el-tree>
        </div>
        <div slot="reference">
            <slot :row="tags" :is-popover-shown="isPopoverShown">
                <div class="h-select-tree-wrap" :class="{clearable: clearable && tags.length}">
                    <div class="h-select-tree-text" v-if="tags.length">
                        <el-tag v-if="multiple"
                                v-for="tag in tags"
                                :key="tag.value"
                                disable-transitions
                                closable
                                @close="handleTagClose(tag.value)"
                                type="info">{{tag.label}}</el-tag>
                        <div class="h-select-tree-text-inner" v-else>{{tags[0].label}}</div>
                    </div>
                    <div class="h-select-tree-placeholder" v-else>{{placeholder}}</div>
                    <i class="icon-suffix el-icon-arrow-down" :class="{'is-reverse': isPopoverShown}"></i>
                    <i class="icon-suffix el-icon-circle-close" @click.stop="clear"></i>
                </div>
            </slot>
        </div>
    </el-popover>
</template>
<style lang="less" rel="stylesheet/less">
.h-select-tree {
    display: inline-block;
    vertical-align: bottom;
    min-width: 150px;
    &-search {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        .el-input__inner {
            border: none;
            border-bottom: 1px solid #eee;
            border-radius: 4px 4px 0 0;
        }
    }
    &-text {
        position: relative;
        top: 0;
        left: 0;
        padding: 0;
        .el-tag {
            margin: 0 5px;
        }
        &-inner {
            padding-left: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    &-placeholder {
        color: #999;
        padding: 0 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    &-popover {
        padding: 0;
    }
    &-view {
        height: 300px;
        overflow: auto;
        position: relative;
        padding: 4px 0;
        .custom-tree-node {
            flex: 1;
            display: flex;
            &.is-disabled {
                color: #999;
                cursor: not-allowed;
            }
        }
        .el-tree {
            position: absolute;
            top: 0;
            left: 0;
            min-width: 100%;
        }
        .el-tree-node__content {
            padding-right: 10px;
        }
        &.autoheight {
            height: auto;
            max-height: 300px;
            .el-tree {
                position: static;
            }
        }
    }
    &-wrap {
        position: relative;
        line-height: 30px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding: 0 25px 0 0;
        box-sizing: border-box;
        cursor: pointer;
        color: #666;
        .icon-suffix {
            position: absolute;
            right: 0;
            top: 50%;
            width: 32px;
            height: 20px;
            line-height: 20px;
            margin-top: -10px;
            text-align: center;
            color: #ccc;
            font-size: 14px;
            transition: transform 0.3s;
            &.is-reverse {
                transform: rotateZ(180deg);
            }
        }
        .el-icon-circle-close {
            display: none;
        }
        &.clearable:hover {
            .el-icon-arrow-down {
                display: none;
            }
            .el-icon-circle-close {
                display: block;
            }
        }
    }
}
</style>
<script>
/**!
 * Copyright (c) 2017 hillinsight.com, Inc. All Rights Reserved
 *
 * @author lifayu(fyli@hillinsight.com)
 * @since 2018-05-14 18:02
 */
'use strict';
import emitter from '../../mixins/emitter';
export default {
    name: 'HSelectTree',
    componentName: 'HSelectTree',
    mixins: [emitter],
    props: {
        clearable: {
            type: Boolean,
            default: false
        },
        autoHeight: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请点击选择'
        },
        width: {
            type: [String, Number]
        },
        onlyLeaf: {
            type: Boolean,
            default: false
        },
        popoverWidth: {
            type: [String, Number],
            default: 200
        },
        multiple: {
            type: Boolean,
            default: false
        },
        defaultExpandedKeys: {
            type: Array
        },
        data: {
            type: [Array, Function],
            default() {
                return [];
            }
        },
        value: {
            type: [Array, String, Number],
            required: true
        },
        labelFormatter: {
            type: Function,
            default(tag) {
                if (Array.isArray(tag)) {
                    return tag.join(' / ');
                }
                else {
                    return tag.toString();
                }
            }
        },
        checkedNodeStatus: {
            type: Function,
            default(data, node) {
                return false;
            }
        },
        defaultProps: {
            type: Object,
            default() {
                return {
                    children: 'children',
                    label: 'struct_name',
                    value: 'struct_id'
                };
            }
        }
    },
    data() {
        return {
            filterText: '',
            currentValue: null,
            isPopoverShown: false,
            datasource: [],
            expandedKeys: [],
            tags: []
        };
    },
    computed: {
        calcPopoverWidth() {
            return this.popoverWidth;
        },
        treeStyle() {
            let style = {};
            if (this.width) {
                if (/^\d+$/.test('' + this.width)) {
                    style.width = this.width + 'px';
                }
                else {
                    style.width = this.width;
                }
            }
            return style;
        }
    },
    created() {
        this.datasource = this.data;
        this.currentValue = this.value;
        this.expandedKeys = this.defaultExpandedKeys || [];
    },
    methods: {
        handlePopoverShow() {
            this.isPopoverShown = true;
            this.$nextTick(() => {
                this.$refs.input.$refs.input.focus();
            });
        },
        handlePopoverHide() {
            this.isPopoverShown = false;
        },
        checkCurrentValue() {
            const tree = this.$refs.tree;
            if (!this.multiple) {
                this.tags = [];
                tree.setCurrentKey(this.currentValue);
                if (!this.currentValue) {
                    return;
                }
                const node = tree.getNode(this.currentValue);
                if (node) {
                    this.expandedKeys = this.getNodeKeys(node);
                    this.tags = [
                        {
                            label: this.getNodePath(node),
                            value: this.currentValue
                        }
                    ];
                }
            }
            else {
                this.clearCheckedNodes();
                this.currentValue.forEach(item => {
                    const node = tree.getNode(item);
                    if (node) {
                        node.checked = true;
                        this.tags.push({
                            label: this.getNodePath(node),
                            value: item
                        });
                    }
                });
            }
        },
        clearCheckedNodes() {
            const tree = this.$refs.tree;
            this.tags.forEach(tag => {
                const node = tree.getNode(tag.value);
                node.checked = false;
            });
            this.tags = [];
        },
        filterNode(value, data) {
            if (!value) return true;
            return data[this.defaultProps.label].indexOf(value) !== -1;
        },
        getNodePath(node) {
            const label = this.defaultProps.label;
            const path = [];
            while (node && node.level !== 0) {
                path.unshift(node.data[label]);
                node = node.parent;
            }
            return this.labelFormatter(path);
        },
        // 获取树展开节点
        getNodeKeys(node) {
            let keys = [];
            const nodeKey = this.defaultProps.value;
            while (node) {
                keys.push(node.data[nodeKey]);
                node = node.parent;
            }
            return keys;
        },
        checkAll(data, node) {
            node.checked = !node.checked;
            node.childNodes.forEach(item => {
                if (!item.isLeaf) {
                    item.checked = !node.checked;
                    this.checkAll(item.data, item);
                }
                else {
                    this.checkNode(item.data, item, node.checked);
                }
            });
        },
        checkNode(data, node, checked) {
            if ((this.onlyLeaf && !node.isLeaf) || data.disabled) {
                return;
            }
            const key = this.$refs.tree.nodeKey;
            if (checked) {
                if (!node.checked) {
                    this.currentValue.push(data[key]);
                }
            }
            else {
                if (node.checked) {
                    const idx = this.currentValue.indexOf(data[key]);
                    if (idx !== -1) {
                        this.currentValue.splice(idx, 1);
                        this.checkRelatedNode(node);
                    }
                }
            }

            this.$emit('change', this.currentValue);
            this.$emit('input', this.currentValue);
            this.dispatch('ElFormItem', 'el.form.change', [this.currentValue]);
            this.$nextTick(() => {
                this.$refs.popover.updatePopper();
            });
        },
        checkRelatedNode(node) {
            if (!this.onlyLeaf) {
                return;
            }
            let parent = node.parent;
            while (parent) {
                parent.checked = false;
                parent = parent.parent;
            }
        },
        handleNodeClick(data, node) {
            if (((this.onlyLeaf && !node.isLeaf) || data.disabled) || this.checkedNodeStatus(data, node)) {
                if (!this.multiple) {
                    this.$refs.tree.setCurrentKey(this.currentValue);
                }
                return;
            }
            const key = this.$refs.tree.nodeKey;
            if (!this.multiple) {
                this.$refs.popover.doClose();
                this.currentValue = data[key];
            }
            else if (node.checked) {
                // const idx = this.tags.findIndex(item => item.value === data[key]);
                const idx = this.currentValue.indexOf(data[key]);
                if (idx !== -1) {
                    this.currentValue.splice(idx, 1);
                    this.checkRelatedNode(node);
                }
            }
            else {
                this.currentValue.push(data[key]);
            }

            this.$emit('change', this.currentValue);
            this.$emit('input', this.currentValue);
            this.dispatch('ElFormItem', 'el.form.change', [this.currentValue]);
            this.$nextTick(() => {
                this.$refs.popover.updatePopper();
            });
        },
        handleTagClose(value) {
            const idx = this.currentValue.indexOf(value);
            if (idx !== -1) {
                this.currentValue.splice(idx, 1);
                const node = this.$refs.tree.getNode(value);
                this.checkRelatedNode(node);
            }
            this.$emit('change', this.currentValue);
            this.$emit('input', this.currentValue);
            this.dispatch('ElFormItem', 'el.form.change', [this.currentValue]);

            this.$nextTick(() => {
                this.$refs.popover.updatePopper();
            });
        },
        clear() {
            if (this.multiple) {
                this.currentValue = [];
                this.clearCheckedNodes();
            }
            else {
                this.$refs.tree.setCurrentKey();
                this.currentValue = '';
            }
            this.tags = [];
            this.$emit('change', this.currentValue);
            this.$emit('input', this.currentValue);
            this.dispatch('ElFormItem', 'el.form.change', [this.currentValue]);
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
        value(val) {
            this.currentValue = val;
        },
        currentValue() {
            this.checkCurrentValue();
        },
        data(val) {
            this.datasource = val;
        },
        datasource() {
            this.$nextTick(() => {
                this.checkCurrentValue();
            });
        }
    }
};
</script>
