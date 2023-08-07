<template>
  <div class="forms">
    <span class="space">區域</span>
    <Select v-model="areaSelected" :options="areaOptions" />
    <div class="buttonOutter">
      <Button innerText="搜尋" />
    </div>
  </div>
    
  <div>
    {{ reactiveData }}
  </div>
    <!-- debug: 
    <div>父層selected {{ areaSelected }}</div> -->

</template>

<script lang="ts">
import { reactive } from 'vue'
import Button from '../composables/Button.vue'
import Select from '../composables/Select.vue'
import * as apiService from '@/services/apiService.js'

export default {
  components: {
    Select,
    Button
  },
  data() {
    const getData = (size: number) => {
      return apiService.get(`/292443d2-faef-452c-96cd-33053e7369b6/json?size=${size}`)
    }
    const reactiveData = reactive({})
    return {
      areaSelected: {},
      areaOptions: [],
      getData,
      reactiveData
    }
  },
  methods: {
    async init() {
      const res = await this.getData(100);
      console.log(res)
      this.areaOptions = [
        { label: 'all', value: 0 },
        { label: 'A', value: 1 },
        { label: 'B', value: 2 },
        { label: 'C', value: 3 }
      ] as never[]
      this.areaSelected = this.areaOptions[0] // 設置預設值
      this.reactiveData = res
    }
  },
  mounted() {
    //  實例掛載到 DOM 節點後(mounted)，可以執行與 DOM 有關的操作
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.forms {
  color: #fff;
  display: flex;
  .space {
    margin: 0px 16px 0px 16px;
  }
  .buttonOutter {
    margin: 0px 16px;
  }
}
@media (max-width: 1280px) {
  .forms {
    flex-direction: column;
    .space {
      margin: 6px 0px;
    }
    .buttonOutter {
      margin: 16px 0px;
    }
  }
}
</style>
