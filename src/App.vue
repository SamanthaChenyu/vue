<template>
      <div class="adTop">
      <AdTop />
    </div>
  <header>
      <Title />
      <nav>
        <RouterLink to="/">{{ routerName[0].name }}</RouterLink>
        <RouterLink to="/third">{{ routerName[1].name }}</RouterLink>
      </nav>
      <Until />
  </header>
  <div class="routerView">
    <RouterView />
  </div>
</template>

<script lang="ts">
import router from '@/router'; 
import { RouterLink, RouterView } from 'vue-router'
import Title from './components/Title.vue'
import Until from './components/Until.vue'
import AdTop from '@/components/icons/AdTopImg.vue';

export default {
  components: {
    AdTop,
    Title
  },
  data() {
    const routerName =  router.options.routes
    return {
      routerName
    }
  }
}


</script>

<style lang="scss" scoped>
.adTop {
  text-align: center;
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
