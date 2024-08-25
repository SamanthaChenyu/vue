<template>
  <div class="adTop" v-if="this.$route.name === '康健作業'">
    <div class="wrapper">
      <div class="contentLeaflet">
        <PcAdTop v-if="screenWidth >= 1200" />
        <MbAdTop v-else />
      </div>
    </div>
  </div>
</template>

<script>
import PcAdTop from './icons/PcAdTopImg.vue'
import MbAdTop from './icons/MbAdTopImg.vue'

export default {
  components: {
    PcAdTop,
    MbAdTop
  },
  props: {
    screenWidth: {
        type: Number,
        required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.adTop {
  padding: 15px 0;
  .wrapper {
    box-sizing: border-box;
    margin: 0 auto;
    max-width: var(--max-width-desktop);
    min-width: var(--max-width-desktop);
    text-align: center;
    .contentLeaflet {
      text-align: center;
    }
  }
  @media (max-width: 1200px) {
    .wrapper {
      max-width: 100%;
      min-width: 100%;
    }
  }
}
</style>
