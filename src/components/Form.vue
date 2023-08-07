<template>
  <div class="forms">
    <span class="space">區域</span>
    <Select v-model="areaSelected" :options="areaOptions" />
    <span class="space">年份</span>
    <Select v-model="yearSelected" :options="yearOptions" />
    <span class="space">月份</span>
    <Select v-model="mountSelected" :options="mountOptions" />
    <div class="buttonOutter">
      <Button innerText="開始搜尋" />
    </div>
  </div>
  <!-- 
    debug: 
    <div>父層selected {{ areaSelected }}{{ yearSelected }}{{ mountSelected }}</div>
  -->
</template>

<script lang="ts">
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import Button from '../composables/Button.vue'
import Select from '../composables/Select.vue'
import * as apiService from '@/services/apiService.js'

export default {
  components: {
    Select,
    Button
  },
  setup() {
    const data = reactive({
        newsData:'',
    })
    // 讓取得資料的程序在 Vue 掛載完成之後才開始進行
    onMounted(() => {

      const test =  axios.get('https://data.ntpc.gov.tw/api/datasets/292443d2-faef-452c-96cd-33053e7369b6/json?size=100')
        .then((res)=>{
        console.log(res.data)
      })

      const getData = apiService.get('/292443d2-faef-452c-96cd-33053e7369b6/json', {
        page: '',
        pageSize: 100,
        keyword: ''
      })
      console.log(getData)
      data.newsData = getData
    })

    return {
      areaSelected: {},
      yearSelected: {},
      mountSelected: {},
      areaOptions: [],
      yearOptions: [],
      mountOptions: [],
      data
    }
  },
  methods: {
    init() {
      this.areaOptions = [
        { label: 'all', value: 0 },
        { label: 'A', value: 1 },
        { label: 'B', value: 2 },
        { label: 'C', value: 3 }
      ] as never[]
      this.yearOptions = [
        { label: 'all', value: 0 },
        { label: 'A', value: 1 },
        { label: 'B', value: 2 },
        { label: 'C', value: 3 }
      ] as never[]
      this.mountOptions = [
        { label: 'all', value: 0 },
        { label: 'A', value: 1 },
        { label: 'B', value: 2 },
        { label: 'C', value: 3 }
      ] as never[]
      this.areaSelected = this.areaOptions[0] // 設置預設值
      this.yearSelected = this.yearOptions[0]
      this.mountSelected = this.mountOptions[0]
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
