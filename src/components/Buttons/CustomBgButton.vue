<template>
  <button @click="handleClick" class="customButton" :style="cssProps">{{ context }}</button>
</template>

<script>
export default {
  props: {
    context: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  computed: {
    cssProps() {
      return {
        '--bg-color': this.color,
      }
    }
  },
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
    color: var(--vt-c-white);
    background-color: var(--bg-color);
    border: solid 1px var(--bg-color);
    font-size: 16px;
    padding: 8px 16px;
    border-radius: 46px;
    line-height: 22px;
    font-weight: 700;
    transition: all .3s;
    &:hover {
        background-color: var(--bg-color);
        color: var(--vt-c-white);
        filter: brightness(130%);
    }
}
</style>
