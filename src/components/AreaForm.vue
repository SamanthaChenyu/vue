<script lang="ts">
import RenderSelect from './core/RenderSelect.vue'
</script>

<template>
   <div class="forms">
    <RenderSelect
      selectedDefault="請選擇" 
      :selectedOption="[
        { text: 'dd33333', value: 'dd'},
        { text: 'd3333d', value: 'dd'}
      ]" />
    </div>
</template>

<style lang="scss" scoped>
.forms {
    width: 1280px;
}
</style>