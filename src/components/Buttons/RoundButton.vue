<template>
    <button @click="handleClick" class="customButton">
        <slot></slot>
    </button>
</template>

<script>
export default {
    methods: {
        handleClick() {
            this.$emit('onClick')
        }
    }
}
</script>

<style lang="scss" scoped>
.customButton {
    cursor: pointer;
    color: #FF9122;
    background-color: var(--vt-c-white);
    border: solid 1px #FF9122;
    font-size: 16px;
    padding: 8px 16px;
    border-radius: 46px;
    line-height: 22px;
    font-weight: 700;
    transition: all .3s;
    &:hover {
        background-color: #FF9122;
        color: var(--vt-c-white);
    }
}
@media (max-width: 1200px) {
    .customButton {
        padding: 4px 16px;
        font-weight: 500;
    }
}
</style>