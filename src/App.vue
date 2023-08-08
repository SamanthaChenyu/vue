<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Title from './components/Title.vue'
import Until from './components/Until.vue'
</script>

<template>
  <header>
      <Title />
      <nav>
        <RouterLink to="/">男女分佈</RouterLink>
        <RouterLink to="/third">測試</RouterLink>
      </nav>
      <Until />
  </header>
  <div class="routerView">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>

header {
  position: absolute;
  top: 0;
  z-index: 1;
}

nav {
  text-align: left;
  display: flex;
  align-items: center;
  a {
    font-size: 12px;
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.routerView {
  margin-top: 72px;
  min-width: 1280px;
  width: 100%;
}

@media (max-width: 1280px) { 
  .routerView {
    margin-top: 72px;
    min-width: 100%;
  }
}


@media (min-width: 1024px) {
  header {
    display: flex;
    width: 100%;
    height: 40px;
    margin: 1rem 0;
  }

  nav {
    font-size: 1rem;
  }
}
</style>
