<template>
   <div class="forms">
    <div>父層selected {{ selected }}</div>
    <Select v-model="selected" :options="options" />
  </div>
</template>

<script lang="ts">
import Select from './core/Select.vue'

export default {
  components: {
    Select
  },
  data() {
    return {
      selected: {},
      options: []
    };
  },
  methods: {
    init() {
      this.options = [
        { label: "all", value: 0 },
        { label: "A", value: 1 },
        { label: "B", value: 2 },
        { label: "C", value: 3 },
      ] as never[]
      this.selected = this.options[0]; // 設置預設值
    }
  },
  mounted() { //  實例掛載到 DOM 節點後(mounted)，可以執行與 DOM 有關的操作
    this.init();
  }
}
</script>

<style lang="scss" scoped>
.forms {
    width: 1280px;
}
</style>