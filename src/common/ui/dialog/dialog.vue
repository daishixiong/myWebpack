<style rel="stylesheet/less" lang="less">
    .in-dialog {
        .el-dialog__body {
            padding: 10px 15px 15px;
            .el-dialog__footer {
                padding: 20px 0 0;
            }
        }
    }
</style>
<script>
export default {
    components: {
        UiDialogContent: {
            template: '<div></div>'
        }
    },
    props: {
        dialog: {
            type: Object,
            default() {
                return {};
            }
        },
        ext: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            dialogVisible: true
        };
    },
    methods: {
        close() {
            this.$emit('close', this);
            this.dialogVisible = false;
            this.tryDestroy();
        },
        ok() {
            this.$emit('ok', ...arguments, this);
            this.dialogVisible = false;
            this.tryDestroy();
        },
        tryDestroy() {
            if (!this.ext.cacheKey) {
                this.$emit('beforeDestroy');
                this.$destroy();
            }
        }
    },
    render() {
        let options = {
            props: Object.assign(
                {
                    closeOnClickModal: false,
                    visible: this.dialogVisible
                },
                this.dialog
            ),
            class: {
                'in-dialog': true
            },
            on: {
                close: this.close
            }
        };

        let contentOptions = {
            props: Object.assign(
                {
                    // 需要使用该参数，只需在业务组件中的props中添加isChild属性，默认值为false
                    isChild: true
                },
                this.ext
            ),
            on: {
                close: this.close,
                ok: this.ok
            }
        };

        return (
            <el-dialog ref="dialog" {...options }>
                <ui-dialog-content {...contentOptions }/>
            </el-dialog>
        );
    }
};
</script>
