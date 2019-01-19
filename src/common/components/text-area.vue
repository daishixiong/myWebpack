<style lang="less" scoped>
    .textarea-container {
        position: relative;
        .textarea-count {
            position: absolute;
            bottom: 0;
            right: 15px;
            color: #999999;
            > span:first-child {
                color: #666666;
            }
        }
    }
</style>

<template>
    <div class="textarea-container">
        <el-input
            :style="propsStyle"
            :maxlength="maxlength"
            type="textarea"
            resize="none"
            :rows="rows"
            :disabled="disabled"
            v-model.trim="curValue"/>
        <div class="textarea-count">
            <span>{{ curLength }}</span><span>/{{ maxlength }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'XTextarea',
    props: {
        propsStyle: {
            type: String,
            default: 'width:100%;'
        },
        rows: {
            type: Number,
            default: 6
        },
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Number],
            default: ''
        },
        maxlength: {
            type: Number,
            default: 50
        }
    },
    data() {
        return {
            curValue: this.value,
            curLength: 0
        };
    },
    created() {
        this.curLength = this.value ? this.value.length : 0;
    },
    watch: {
        value(val) {
            this.curValue = val;
        },
        curValue(val) {
            this.$emit('input', val);
            this.curLength = val.length;
        }
    }
};
</script>
