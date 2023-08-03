<script lang="ts">
import { ref } from 'vue'
import Select from './core/Select.vue'

export default {
  setup() {
      const selected = ref("")
    return {
      selected
    }
  }
}
</script>

<template>
  {{ selected }}
  <Select selectedDefault="請選擇" :selectedOption="[{ text: 'dd', value: 'dd'},{ text: 'dd', value: 'dd'}]" />
  <Select selectedDefault="請選擇" :selectedOption="[{ text: 'dd', value: 'dd'},{ text: 'dd', value: 'dd'}]" />
</template>
