<template>
  <div :class="{'day-mode' : isDayMode, 'night-mode' : !isDayMode}">

    <button @click="toggleMode">切换模式</button>
  </div>
</template>

<script>


export default {
  components: {
  },
  data() {
    return {
      isDayMode: true  // 默认为白天模式
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
     this.isDayMode = !this.isDayMode;  // 切换日夜模式
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
