<template>
  <Header />
  <Slider />
</template>

<script>
import Header from '@/components/Header.vue'
import Slider from '@/components/Slider.vue'

export default {
  components: {
    Header,
    Slider
  },
  data() {
    return {
      isDayMode: true // 默认为白天模式
    }
  },
  mounted() {
    // 每次進該頁面即render
    this.init()
  },
  methods: {
    init() {
      console.log('111')
    },
    toggleMode() {
      this.isDayMode = !this.isDayMode // 切换日夜模式
    }
  }
}
</script>

<style scoped lang="scss">
.day-mode {
  background-color: #fff;
  color: #000;
}
.night-mode {
  background-color: #000;
  color: #fff;
}
</style>
