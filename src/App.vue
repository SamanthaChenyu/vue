<template>
  <AdTop :screenWidth="screenWidth" />
  <Navbar :screenWidth="screenWidth" />
  <div class="routerView">
    <RouterView />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { RouterView } from 'vue-router'
import router from '@/router'
import Navbar from '@/components/Navbar.vue'
import AdTop from '@/components/AdTop.vue'

export default {
  components: {
    Navbar,
    AdTop
  },
  mounted() {
    this.screenWidth = window.innerWidth
    window.addEventListener('resize', this.handleResize)
  },
  watch: {
    screenWidth: {
      immediate: true,
      deep: true,
      handler(val) {
        console.log('螢幕寬度為：' + val)
      }
    }
  },
  data() {
    const store = useStore();
    const routerName = router.options.routes
    const updateIsScreen = (screenWidth) => {
      store.dispatch('setIsScreenWidth', screenWidth);
    };

    return {
      routerName,
      screenWidth: 0, //螢幕寬度
      updateIsScreen
    }
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth
      // store
      this.updateIsScreen(window.innerWidth)
    }
  },
  beforeDestroy() {
    // 在组件销毁前取消事件监听
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="scss" scoped>
.routerView {
  box-sizing: border-box;
  margin: 0 auto;
}

@media (max-width: 1200px) {
  .routerView {
    margin: auto;
    min-width: 100%;
    padding-right: 18px;
    padding-left: 18px;
  }
}
</style>
