<template>
  <div v-bind:class="{ menuPage: true, isNoShow: isMenuPageShow }">
    <div class="mbBanner" v-if="screenWidth < 1200">
        <img src="../assets/mbBanner.png" />
      </div>
    <div class="link">
      <span class="center">MENU</span>
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
    }
  },
  data() {
    return {
      data: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.isNoShow {
    left: 0 !important;
}
.menuPage {
  position: fixed;
  z-index: 999;
  height: 100%;
  width: 100%;
  left: -100%;
  background: #f7f7f7;
  display: flex;
  justify-content: center;
  overflow: hidden;
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
        background: var(--vt-c-white);
    }
    .mbBanner {
        height: 82px;
    }
}
</style>
