<template>
    <div class="customSelectOut">
        <div class="arrow" />
        <select v-model="selected" @change="handleSelectChange" class="customSelect">
            <option v-for="item in options" :key="item.value" :value="item.value">
                {{ item?.label }}
            </option>
        </select>
    </div>

        <!-- 
            debug: 
            <div>子層modelValue {{ modelValue }}</div>
            <div>子層selected {{ selected }}</div> 
        -->
</template>

<script lang="ts">
import { reactive } from 'vue'

export default {
    props: {
        options: {
            type: Array<{ label: string, value: any }>,
            required: true
        },
        modelValue: Object
    },
    setup() {
        const selected = reactive({}) // 偵測資料變動
        return {
            selected
        }
    },
    watch: {
        modelValue() {
            this.updateSelected();
        }
    },
    methods: {
        handleSelectChange(e: Event) {
            const target = this.options.find((option) => {
                return String(option.value) === (e.target as HTMLInputElement).value;
            });
            this.$emit("update:modelValue", target);
            // 從 options[] 找到 current object，將 modelValue 設置為 current object
        },
        updateSelected() {
            this.selected = this.modelValue?.value // 將子層的 v-model 設置成父層傳進來的 v-model 值
        }
    },
    mounted() { //  實例掛載到 DOM 節點後(mounted)，可以執行與 DOM 有關的操作
        this.updateSelected()
    }
    
}
</script>

<style lang="scss" scoped>
.customSelectOut {
    position: relative;
    width: 190px;
    .customSelect {
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;

        cursor: pointer;
        color: black;
        line-height: 1.25rem;
        font-weight: 600;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        align-items: center;
        width: 100%;
        display: flex;
        box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.5);
        border: 1px solid #e5e7eb;
        &:focus {
            box-shadow: 0 0 5px 2px rgba(0, 178, 119, 0.6);   
        }
        &:focus-visible {
            outline: none;
        }
    }   
    .arrow {
        position: absolute;
        pointer-events: none;
        width: 0px;
        height: 0px;
        border-top: 10px solid rgba(0, 178, 119, 0.6);
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;

        top: 50%;
        transform: translateY(-50%);
        right: 10px;
    } 
}
@media (max-width: 1280px) { 
    .customSelectOut {
        width: 100%;
    }
 }
</style>

