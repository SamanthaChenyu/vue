<template>
    <button class="buttonStyle">{{ innerText }}</button>
</template>

<script lang="ts">
export default {
    props: {
        innerText: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss">
    .buttonStyle {
        cursor: pointer;
        width: 140px;
        line-height: 0.25rem;
        font-weight: 600;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        border: none;
        margin: 0px 6px;
        height: 30px;
        background-size: 300% 100%;
        color: #fff;
        background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
        &:hover {
            background-position: 100% 0;
            -o-transition: all .4s ease-in-out;
            -webkit-transition: all .4s ease-in-out;
            transition: all .4s ease-in-out;
        }
        &:focus {
            outline: none;
        }
    }
    @media (max-width: 1280px) { 
        .buttonStyle {
            width: 100%;
            margin: 0px;
        }
    }
</style>