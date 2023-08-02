<script lang="ts">
import Select from './material/Select.vue'
import { reactive, ref } from 'vue'

export default {
    setup(props, context) {
        console.log(context.emit)

        const selectTest1 = ref('123')
        const selectTest2 = ref('123')
        return {
            selectTest1,
            selectTest2
        }
    }
    
}
</script>

<template>
    <div class="forms">
        <Select 
            v-model="selectTest2"
            selectedDefault="請選擇" 
            :selectedOption="[{ text: `123`, value: `123` }]" />
        <Select 
            v-model="selectTest1"
            selectedDefault="請選擇" 
            :selectedOption="[{ text: `123`, value: `153` }]" />
    </div>
    {{ selectTest1 }}
    {{ selectTest2 }}
</template>

<style  lang="scss" scoped>
.forms {
    width: 1280px;
}
</style>