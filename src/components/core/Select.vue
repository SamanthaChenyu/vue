<script lang="ts">
import { ref } from 'vue'

export default {
    props: {
        selectedDefault: {
            type: String,
            required: true
        },
        selectedOption: {
            type: Array<{ text: String, value: String }>,
            required: true
        }
    },
    setup(props, context) {
        console.log(context.emit)
        const value = ref("")
        return {
            value
        }
    },
    
}

</script>

<template>
    <div class="forms">
        <select v-model="value" class="customSelect">
            <option disabled value="">{{ selectedDefault }}</option>
            <option v-for="item in selectedOption" v-bind="item">
                {{ item?.text }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
.forms {
    width: 1280px;
    .customSelect {
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;

    position: relative;
    color: black;
    line-height: 1.25rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    align-items: center;
    display: flex;
    box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.5);
    border: 0 solid #e5e7eb;
    &:focus {
        box-shadow: 0 0 5px 2px rgba(0, 178, 119, 0.6);   
    }
    &:focus-visible {
        outline: none;
    }
}
}
</style>

