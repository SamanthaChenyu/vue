<template>
  <header v-if="screenWidth >= 1200">
    <nav>
      <RouterLink to="/">{{ routerName[0].name }}</RouterLink>
      <RouterLink to="/third">{{ routerName[1].name }}</RouterLink>
    </nav>
  </header>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import router from '../router/index'

export default {
  props: {
    screenWidth: {
        type: Number,
        required: true
    }
  },
  data() {
    const routerName = router.options.routes
    return {
      routerName
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  background: #b38e5b;
}
nav {
  min-width: var(--max-width-desktop);
  max-width: var(--max-width-desktop);
  margin: 0px auto;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  a {
    color: var(--vt-c-white);
    font-size: 14px;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    padding: 0px 1rem;
    border-left: 1px solid var(--color-border);
    &.router-link-exact-active,
    &.router-link-exact-active:hover {
      color: var(--vt-c-white);
      background-color: #965702;
    }
    &:hover {
      color: var(--vt-c-white);
      background: #ff9122;
      // background-color: #965702;
      // filter: brightness(150%); 不確定是不是同色系列
    }
    &:first-of-type {
      border: 0;
    }
  }
}
@media (max-width: 1200px) {
  header {
    display: none;
  }
}
</style>
