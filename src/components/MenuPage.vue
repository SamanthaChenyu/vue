<template>
  <div v-bind:class="{ menuPagebox: true, isNoShow: isMenuPageShow }" @click.self="pageClose">
  <div 
    v-bind:class="{ menuPage: true }" 
    :style="menuPageTop"
  >
    <div class="mbBanner" v-if="screenWidth < 1200">
        <img src="../assets/mbBanner.png" />
      </div>
    <div class="link">
      <span class="center">MENU</span>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    isMenuPageShow: {
      type: Boolean,
      required: true
    },
    screenWidth: {
        type: Number,
        required: true
    },
    scrollY: {
      type: Number,
      required: true      
    }
  },
  computed: {
    menuPageTop() {
      if (this.screenWidth >= 1200) {
        if (this.scrollY >= 320) {
          return 'top: 90px;'
        } else {
          return `top: ${410 - this.scrollY}px;`
        }
      } 
      if (this.screenWidth < 1200) {
        if (this.scrollY >= 285) {
          return 'top: 60px;'
        } else {
          return `top: ${345 - this.scrollY}px;`
        }
      }
    }
  },
  data() {
    return {
      data: 0,
    }
  },
  methods: {
    pageClose() {
      const target = document.querySelector("#checkbox")
      target.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.isNoShow {
    left: 0 !important;
}
.menuPagebox {
  position: fixed;
    z-index: 999;
    height: 100%;
    width: 100%;
    left: -100%;
    top: 0;
    transition: all .3s;
}
.menuPage {
  background: #f7f7f7;
    display: flex;
    justify-content: center;
    overflow-y: scroll;
    overscroll-behavior: contain;
    transition: all 0.3s;
    width: 100%;
    height: 100%;
    position: absolute;
  transition: all 0.3s;
  .center {
    position: absolute;
    font-size: 64px;
    font-weight: 400;
    top: 25%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
}

@media (max-width: 1200px) {
    .menuPage {
        background-color: #F7F7F7;
        top: 345px;
    }
    .mbBanner {
        height: 82px;
        margin-top: 16px;
    }
}
</style>
