<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Title from './components/Title.vue'
import Until from './components/Until.vue'
</script>

<template>
  <header>
      <Title msg="111111" />
      <nav>
        <RouterLink to="/">test0</RouterLink>
        <RouterLink to="/third">test1</RouterLink>
      </nav>
      <Until />
  </header>
  <div class="routerView">
  <RouterView />
  </div>
</template>

<style scoped>

header {
  position: absolute;
  top: 0;
  z-index: 1;
}

nav {
  font-size: 12px;
  text-align: left;
  display: flex;
  align-items: center;
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
