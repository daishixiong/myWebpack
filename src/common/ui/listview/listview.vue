<template>
    <div class="h-common-listview">
        <div class="query" :class="[`query-${queryType}`]" v-if="$slots.query">
            <slot name="query"></slot>
        </div>
        <hr v-if="$slots.query && $slots.fn"/>
        <div class="fn" v-if="$slots.fn">
            <slot name="fn"></slot>
        </div>
        <div class="list" v-loading="loading">
            <slot name="list" :listData="listData"></slot>
        </div>
        <div class="pager">
            <slot name="pager" :pageData="pageData">
                <el-pagination v-show="pageData.total>0"
                               :current-page.sync="pageData.number"
                               :page-size="+pageData.size"
                               :total="+pageData.total"
                               @current-change="handleCurrentChange"
                               @size-change="handleSizeChange"
                               layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </slot>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
.h-common-listview {
    > hr {
        border: none;
        border-bottom: 1px dashed #ddd;
        margin: 0 0 15px;
    }
    .query,
    .fn {
        margin-bottom: 15px;
    }
    .query {
        .el-form {
            margin-bottom: -10px;
        }
        .el-form-item {
            margin-bottom: 10px;
        }
        &-top {
            .el-form-item__label {
                display: block;
                font-size: 12px;
                padding: 0;
                text-align: left;
                line-height: 20px;
                color: #666;
                & + .el-form-item__content {
                    margin-top: 0;
                }
            }
            .el-form-item__content {
                margin-top: 20px;
            }
        }
    }
    .pager {
        text-align: right;
        margin-top: 15px;
    }
}
</style>
<script>
/**!
 * Copyright (c) 2017 hillinsight.com, Inc. All Rights Reserved
 *
 * @author lifayu(fyli@hillinsight.com)
 * @since 2018-05-04 16:57
 */
'use strict';
export default {
    name: 'HListView',
    componentName: 'HListView',
    props: {
        /**
         * 默认查询参数
         */
        defaultQuery: {
            type: Object,
            default() {
                return {};
            }
        },
        /**
         * 数据加载方法
         * @return {Promise}
         */
        loadData: {
            required: true,
            type: Function
        },
        immediately: {
            type: Boolean,
            default: true
        },
        router: {
            type: Boolean,
            default: false
        },
        dataType: {
            type: String,
            default() {
                return '1';
            }
        },
        queryType: {
            type: String,
            default() {
                return 'left';
            }
        }
    },
    data() {
        let pageConfig = {
            number: 'number',
            size: 'size',
            total: 'total'
        };
        if (this.dataType !== '1') {
            pageConfig = {
                number: 'pageIndex',
                size: 'pageSize',
                total: 'total'
            };
        }
        return {
            pageConfig: pageConfig,
            listData: [],
            pageData: {
                number: 1,
                size: 10,
                total: 0
            },
            query: {},
            loading: false
        };
    },
    created() {
        this.query = Object.assign(this.query, this.defaultQuery);
        this.pageData.number = +this.query[this.pageConfig.number] || 1;
        this.pageData.size = +this.query[this.pageConfig.size] || 10;
        if (this.immediately) {
            this.fetchData(this.query[this.pageConfig.number]);
        }
    },
    watch: {
        defaultQuery: {
            deep: true,
            handler: function () {
                this.$nextTick(() => {
                    this.query = this.defaultQuery;
                    if (this.query[this.pageConfig.size]) {
                        this.pageData.size = +this.query[this.pageConfig.size];
                    }
                    this.fetchData(this.query[this.pageConfig.number]);
                });
            }
        }
    },
    methods: {
        search(query, overide = false) {
            let q = {};
            if (overide) {
                q = query;
            }
            else {
                q = Object.assign({}, this.query, query);
            }
            q[this.pageConfig.number] = 1;
            if (this.router) {
                this.$router.push({
                    path: this.$route.path,
                    query: Object.assign({}, q, {
                        [this.pageConfig.size]: q[this.pageConfig.size] || this.pageData.size,
                        [this.pageConfig.number]: 1,
                        _: Date.now()
                    })
                });
            }
            else {
                this.query = q;
                this.fetchData(1);
            }
        },
        refresh() {
            this.fetchData(this.query[this.pageConfig.number]);
        },
        fetchData(page = 1) {
            this.query[this.pageConfig.number] = page;
            this.query[this.pageConfig.size] = this.pageData.size;
            this.loading = true;
            this.loadData(this.query)
                .then(data => {
                    // TODO
                    this.listData = data.list || data.result;
                    if (this.dataType === '1') {
                        this.pageData = data.page;
                    }
                    else {
                        this.pageData = {
                            number: data.pageIndex,
                            size: data.pageSize,
                            total: data.total
                        };
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        handleSizeChange(size) {
            this.pageData.size = size;
            if (this.router) {
                this.$router.push({
                    path: this.$route.path,
                    query: Object.assign({}, this.$route.query, {
                        [this.pageConfig.size]: this.pageData.size,
                        [this.pageConfig.number]: 1
                    })
                });
            }
            else {
                this.fetchData(1);
            }
        },
        handleCurrentChange(page) {
            if (this.router) {
                this.$router.push({
                    path: this.$route.path,
                    query: Object.assign({}, this.$route.query, {
                        [this.pageConfig.size]: this.pageData.size,
                        [this.pageConfig.number]: page
                    })
                });
            }
            else {
                this.fetchData(page);
            }
        }
    }
};
</script>
